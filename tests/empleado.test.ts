/* eslint-disable @typescript-eslint/no-magic-numbers */

import { mock, MockProxy } from "jest-mock-extended";
import Empleado from "../src/empleado";
import Comida from "../src/menu/comida";
import Pedido from "../src/pedidos/pedido";
import ItemPedido from "../src/pedidos/itemPedido";
import IPedidoModificable from "../src/pedidos/IPedidoModificable";

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

  it("agregarItem agrega el producto al pedido con cantidad 1 por defecto", () => {
    const pedido = mock<Pedido>();
    empleado.agregarItem(pedido, milanesa);
    expect(pedido.agregarProducto).toHaveBeenCalledWith(milanesa, 1);
  });

  it("agregarItem agrega el producto al pedido con la cantidad indicada", () => {
    const pedido = mock<Pedido>();
    empleado.agregarItem(pedido, milanesa, 3);
    expect(pedido.agregarProducto).toHaveBeenCalledWith(milanesa, 3);
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
    const itemPedido = mock<ItemPedido>();
    empleado.corregirItem(pedido, itemPedido);
    expect(pedido.quitarHastaItem).toHaveBeenCalledWith(itemPedido);
  });
});
