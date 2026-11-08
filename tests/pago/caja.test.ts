import { mock, MockProxy } from "jest-mock-extended";
import Caja from "../../src/pago/caja";
import Pedido from "../../src/pedidos/pedido";
import PedidoSalon from "../../src/pedidos/pedidoSalon";
import PedidoDelivery from "../../src/pedidos/pedidoDelivery";
import Empleado from "../../src/empleado";
import Producto from "../../src/menu/producto";
import Parrilla from "../../src/cocina/parrilla";
import IDescuento from "../../src/pago/iDescuento";
import IMedioPago from "../../src/pago/iMedioPago";
import Efectivo from "../../src/pago/efectivo";
import TarjetaDebito from "../../src/pago/tarjetaDebito";
import DescuentoEfectivo from "../../src/pago/descuentoEfectivo";
import DescuentoDiaEspecial from "../../src/pago/descuentoDiaEspecial";
import DiaSemana from "../../src/pago/diaSemana";
import ErrorPedidoNoFacturable from "../../src/error/errorPedidoNoFacturable";

const UN_MARTES = new Date(2026, 10, 10);
const UN_MIERCOLES = new Date(2026, 10, 11);

describe("Caja (con dobles de prueba)", () => {
  let pedido: MockProxy<Pedido>;
  let medioPago: MockProxy<IMedioPago>;

  beforeEach(() => {
    pedido = mock<Pedido>();
    medioPago = mock<IMedioPago>();
    pedido.calcularSubtotal.mockReturnValue(10000);
    pedido.calcularTotal.mockReturnValue(10000);
  });

  function descuentoQueDevuelve(monto: number): MockProxy<IDescuento> {
    const descuento = mock<IDescuento>();
    descuento.calcularDescuento.mockReturnValue(monto);
    return descuento;
  }

  it("sin descuentos cobra el total del pedido", () => {
    expect(new Caja().calcularTotalACobrar(pedido, medioPago)).toBe(10000);
  });

  it("si ningun descuento aplica cobra el total del pedido", () => {
    const caja = new Caja([descuentoQueDevuelve(0), descuentoQueDevuelve(0)]);
    expect(caja.calcularTotalACobrar(pedido, medioPago)).toBe(10000);
  });

  it("aplica solo el descuento mas beneficioso, sin combinarlos", () => {
    const caja = new Caja([descuentoQueDevuelve(1000), descuentoQueDevuelve(1500), descuentoQueDevuelve(500)]);
    expect(caja.calcularTotalACobrar(pedido, medioPago)).toBe(8500);
  });

  it("calcula los descuentos sobre el subtotal y con el medio de pago elegido", () => {
    const descuento = descuentoQueDevuelve(0);
    pedido.calcularSubtotal.mockReturnValue(8000);

    new Caja([descuento]).calcularTotalACobrar(pedido, medioPago);

    expect(descuento.calcularDescuento).toHaveBeenCalledWith(8000, medioPago);
  });
});

describe("Caja (escenarios completos)", () => {
  let milanesa: Producto;
  let caja: Caja;

  beforeEach(() => {
    milanesa = new Producto("Milanesa", true, 5000, new Parrilla());
    caja = new Caja([new DescuentoEfectivo(10), new DescuentoDiaEspecial(DiaSemana.MARTES, 15)]);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("un miercoles en efectivo aplica el descuento por efectivo", () => {
    jest.useFakeTimers().setSystemTime(UN_MIERCOLES);
    const pedido = new PedidoSalon("P-1", [milanesa, milanesa], "Mesa 2", mock<Empleado>());

    expect(caja.calcularTotalACobrar(pedido, new Efectivo())).toBe(9000);
  });

  it("un miercoles con tarjeta no aplica ningun descuento", () => {
    jest.useFakeTimers().setSystemTime(UN_MIERCOLES);
    const pedido = new PedidoSalon("P-1", [milanesa, milanesa], "Mesa 2", mock<Empleado>());

    expect(caja.calcularTotalACobrar(pedido, new TarjetaDebito())).toBe(10000);
  });

  it("un martes en efectivo aplica solo el mayor (15% del dia especial, no 10% + 15%)", () => {
    jest.useFakeTimers().setSystemTime(UN_MARTES);
    const pedido = new PedidoSalon("P-1", [milanesa, milanesa], "Mesa 2", mock<Empleado>());

    expect(caja.calcularTotalACobrar(pedido, new Efectivo())).toBe(8500);
  });

  it("en un delivery el costo de envio nunca recibe descuento", () => {
    jest.useFakeTimers().setSystemTime(UN_MIERCOLES);
    const pedido = new PedidoDelivery("P-2", [milanesa, milanesa], mock<Empleado>(), "Calle 123", 1500);

    // 10% de 10000 (solo productos) = 1000 -> (10000 + 1500) - 1000
    expect(caja.calcularTotalACobrar(pedido, new Efectivo())).toBe(10500);
  });
});

describe("Caja - facturacion e historial", () => {
  let parrilla: Parrilla;
  let milanesa: Producto;
  let caja: Caja;

  beforeEach(() => {
    parrilla = new Parrilla();
    milanesa = new Producto("Milanesa", true, 5000, parrilla);
    caja = new Caja([new DescuentoEfectivo(10)]);
    jest.useFakeTimers().setSystemTime(UN_MIERCOLES);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  /** Confirma el pedido, la parrilla prepara todo y el pedido queda listo para facturar. */
  function prepararPedidoListo(pedido: Pedido): void {
    pedido.confirmar();
    let item = parrilla.procesarSiguiente();
    while (item) {
      item.avanzarEstado();
      item = parrilla.procesarSiguiente();
    }
    pedido.marcarListo();
  }

  it("empieza con el historial vacio", () => {
    expect(caja.getHistorial()).toHaveLength(0);
  });

  it("factura un pedido listo: devuelve la factura con el descuento aplicado y la guarda en el historial", () => {
    const pedido = new PedidoSalon("P-1", [milanesa, milanesa], "Mesa 2", mock<Empleado>());
    prepararPedidoListo(pedido);

    const factura = caja.facturar(pedido, new Efectivo());

    expect(factura.getNumeroPedido()).toBe("P-1");
    expect(factura.getDescuento()).toBe(1000);
    expect(factura.getTotal()).toBe(9000);
    expect(caja.getHistorial()).toEqual([factura]);
  });

  it("al facturar el pedido queda finalizado y no se puede facturar de nuevo", () => {
    const pedido = new PedidoSalon("P-1", [milanesa], "Mesa 2", mock<Empleado>());
    prepararPedidoListo(pedido);
    caja.facturar(pedido, new Efectivo());

    expect(pedido.puedeFacturarse()).toBe(false);
    expect(() => caja.facturar(pedido, new Efectivo())).toThrow(ErrorPedidoNoFacturable);
    expect(caja.getHistorial()).toHaveLength(1);
  });

  it("no factura un pedido en construccion", () => {
    const pedido = new PedidoSalon("P-1", [milanesa], "Mesa 2", mock<Empleado>());

    expect(() => caja.facturar(pedido, new Efectivo())).toThrow(ErrorPedidoNoFacturable);
    expect(caja.getHistorial()).toHaveLength(0);
  });

  it("no factura un pedido si algun item no esta listo", () => {
    const pedido = new PedidoSalon("P-1", [milanesa, milanesa], "Mesa 2", mock<Empleado>());
    pedido.confirmar();
    parrilla.procesarSiguiente()?.avanzarEstado();
    pedido.marcarListo();

    expect(() => caja.facturar(pedido, new Efectivo())).toThrow(ErrorPedidoNoFacturable);
    expect(caja.getHistorial()).toHaveLength(0);
  });

  it("guarda en el historial cada pedido facturado, en orden, con el detalle de lo cobrado", () => {
    const pedidoSalon = new PedidoSalon("P-1", [milanesa], "Mesa 2", mock<Empleado>());
    const pedidoDelivery = new PedidoDelivery("P-2", [milanesa], mock<Empleado>(), "Calle 123", 1500);
    prepararPedidoListo(pedidoSalon);
    prepararPedidoListo(pedidoDelivery);

    caja.facturar(pedidoSalon, new TarjetaDebito());
    caja.facturar(pedidoDelivery, new Efectivo());

    const historial = caja.getHistorial();
    expect(historial.map(factura => factura.getNumeroPedido())).toEqual(["P-1", "P-2"]);
    expect(historial[0].getTotal()).toBe(5000);
    expect(historial[1].getCargosExtra()).toBe(1500);
    expect(historial[1].getTotal()).toBe(5000 + 1500 - 500);
  });

  it("getHistorial devuelve una copia que no modifica el historial de la caja", () => {
    const pedido = new PedidoSalon("P-1", [milanesa], "Mesa 2", mock<Empleado>());
    prepararPedidoListo(pedido);
    caja.facturar(pedido, new Efectivo());

    caja.getHistorial().pop();

    expect(caja.getHistorial()).toHaveLength(1);
  });
});
