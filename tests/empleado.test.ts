import { mock, MockProxy } from "jest-mock-extended";
import Empleado from "../src/empleado";
import Comida from "../src/comida";
import Pedido from "../src/pedido";
import IPedidoModificable from "../src/IPedidoModificable";

describe("Empleado", () => {
  let empleado: Empleado;
  let milanesa: MockProxy<Comida>;

  beforeEach(() => {
    empleado = new Empleado("Ana", "20-12345678-9", "Salón");
    milanesa = mock<Comida>();
  });

  it("getNombre devuelve el nombre del constructor", () => {
    expect(empleado.getNombre()).toBe("Ana");
  });

  it("getCuil devuelve el cuil del constructor", () => {
    expect(empleado.getCuil()).toBe("20-12345678-9");
  });

  it("getSector devuelve el sector del constructor", () => {
    expect(empleado.getSector()).toBe("Salón");
  });

  it("agregarItem agrega el item al pedido", () => {
    const pedido = mock<Pedido>();
    empleado.agregarItem(pedido, milanesa);
    expect(pedido.agregarProducto).toHaveBeenCalledWith(milanesa);
  });

  it("agregarItem propaga el error si el pedido rechaza el item", () => {
    const pedido = mock<Pedido>();
    pedido.agregarProducto.mockImplementation(() => {
      throw new Error("no disponible");
    });
    expect(() => empleado.agregarItem(pedido, milanesa)).toThrow("no disponible");
  });

  it("corregirItem quita del pedido hasta el item indicado", () => {
    const pedido = mock<IPedidoModificable>();
    empleado.corregirItem(pedido, milanesa);
    expect(pedido.quitarHastaItem).toHaveBeenCalledWith(milanesa);
  });
});
