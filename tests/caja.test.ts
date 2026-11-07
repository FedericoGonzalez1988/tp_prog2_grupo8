import { mock, MockProxy } from "jest-mock-extended";
import Caja from "../src/caja";
import Pedido from "../src/pedido";
import PedidoSalon from "../src/pedidoSalon";
import PedidoDelivery from "../src/pedidoDelivery";
import Empleado from "../src/empleado";
import Producto from "../src/producto";
import Parrilla from "../src/parrilla";
import IDescuento from "../src/iDescuento";
import IMedioPago from "../src/iMedioPago";
import Efectivo from "../src/efectivo";
import TarjetaDebito from "../src/tarjetaDebito";
import DescuentoEfectivo from "../src/descuentoEfectivo";
import DescuentoDiaEspecial from "../src/descuentoDiaEspecial";
import DiaSemana from "../src/diaSemana";

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
