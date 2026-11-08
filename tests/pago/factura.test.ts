import { mock } from "jest-mock-extended";
import Factura from "../../src/pago/factura";
import PedidoSalon from "../../src/pedidos/pedidoSalon";
import PedidoDelivery from "../../src/pedidos/pedidoDelivery";
import Empleado from "../../src/empleado";
import Producto from "../../src/menu/producto";
import Combo from "../../src/menu/combo";
import Parrilla from "../../src/cocina/parrilla";
import Barra from "../../src/cocina/barra";
import EstrategiaComboPorcentaje from "../../src/menu/estrategiaComboPorcentaje";
import Efectivo from "../../src/pago/efectivo";

const FECHA_COBRO = new Date(2026, 10, 10, 21, 30);

describe("Factura", () => {
  let milanesa: Producto;
  let comboBurger: Combo;
  const efectivo = new Efectivo();

  beforeEach(() => {
    const parrilla = new Parrilla();
    milanesa = new Producto("Milanesa", true, 6000, parrilla);
    const hamburguesa = new Producto("Hamburguesa", true, 5000, parrilla);
    const gaseosa = new Producto("Gaseosa", true, 1000, new Barra());
    comboBurger = new Combo("Combo Burger", true, "C1", [hamburguesa, gaseosa], new EstrategiaComboPorcentaje(10));
    jest.useFakeTimers().setSystemTime(FECHA_COBRO);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("copia los datos del pedido, la fecha de cobro y el medio de pago", () => {
    const pedido = new PedidoSalon("P-1", [milanesa], "Mesa 1", mock<Empleado>());

    const factura = new Factura(pedido, efectivo, 0);

    expect(factura.getNumeroPedido()).toBe("P-1");
    expect(factura.getFecha()).toEqual(FECHA_COBRO);
    expect(factura.getMedioPago()).toBe(efectivo);
  });

  it("arma una linea por item con su descripcion, cantidad e importe (combos con su beneficio)", () => {
    const pedido = new PedidoSalon("P-1", [], "Mesa 1", mock<Empleado>());
    pedido.agregarProducto(milanesa, 2);
    pedido.agregarProducto(comboBurger);

    const lineas = new Factura(pedido, efectivo, 0).getLineas();

    expect(lineas).toHaveLength(2);
    expect([lineas[0].getDescripcion(), lineas[0].getCantidad(), lineas[0].getImporte()])
      .toEqual(["Milanesa", 2, 12000]);
    expect([lineas[1].getDescripcion(), lineas[1].getCantidad(), lineas[1].getImporte()])
      .toEqual(["Combo Burger", 1, 5400]);
  });

  it("detalla subtotal, descuento y total en un pedido sin cargos extra", () => {
    const pedido = new PedidoSalon("P-1", [milanesa, milanesa], "Mesa 1", mock<Empleado>());

    const factura = new Factura(pedido, efectivo, 1200);

    expect(factura.getSubtotal()).toBe(12000);
    expect(factura.getCargosExtra()).toBe(0);
    expect(factura.getDescuento()).toBe(1200);
    expect(factura.getTotal()).toBe(10800);
  });

  it("en un delivery muestra el costo de envio como cargo extra", () => {
    const pedido = new PedidoDelivery("P-2", [milanesa], mock<Empleado>(), "Calle 123", 1500);

    const factura = new Factura(pedido, efectivo, 600);

    expect(factura.getSubtotal()).toBe(6000);
    expect(factura.getCargosExtra()).toBe(1500);
    expect(factura.getTotal()).toBe(6000 + 1500 - 600);
  });

  it("no cambia si despues se modifica el precio del producto en el menu", () => {
    const pedido = new PedidoSalon("P-1", [milanesa], "Mesa 1", mock<Empleado>());
    const factura = new Factura(pedido, efectivo, 0);

    milanesa.setPrecio(9999);

    expect(factura.getSubtotal()).toBe(6000);
    expect(factura.getLineas()[0].getImporte()).toBe(6000);
    expect(factura.getTotal()).toBe(6000);
  });

  it("getLineas y getFecha devuelven copias que no alteran la factura", () => {
    const pedido = new PedidoSalon("P-1", [milanesa], "Mesa 1", mock<Empleado>());
    const factura = new Factura(pedido, efectivo, 0);

    factura.getLineas().pop();
    factura.getFecha().setFullYear(2000);

    expect(factura.getLineas()).toHaveLength(1);
    expect(factura.getFecha()).toEqual(FECHA_COBRO);
  });
});
