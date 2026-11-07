import { mock, MockProxy } from "jest-mock-extended";
import ItemPedidoSimple from "../src/itemPedidoSimple";
import Producto from "../src/producto";
import Estacion from "../src/estacion";
import ErrorItemNoModificable from "../src/error/errorItemNoModificable";

describe("ItemPedidoSimple", () => {
  let producto: MockProxy<Producto>;
  let estacion: MockProxy<Estacion>;
  let itemPedido: ItemPedidoSimple;

  beforeEach(() => {
    producto = mock<Producto>();
    estacion = mock<Estacion>();
    producto.getPrecio.mockReturnValue(2500);
    producto.getEstacion.mockReturnValue(estacion);
    itemPedido = new ItemPedidoSimple(producto, 2);
  });

  it("guarda el producto y la cantidad", () => {
    expect(itemPedido.getProducto()).toBe(producto);
    expect(itemPedido.getCantidad()).toBe(2);
  });

  it("comienza en estado Pendiente y sin estar listo", () => {
    expect(itemPedido.getNombreEstado()).toBe("Pendiente");
    expect(itemPedido.estaListo()).toBe(false);
  });

  it("avanza de Pendiente a En Preparacion y luego a Listo", () => {
    itemPedido.avanzarEstado();
    expect(itemPedido.getNombreEstado()).toBe("En Preparacion");
    expect(itemPedido.estaListo()).toBe(false);

    itemPedido.avanzarEstado();
    expect(itemPedido.getNombreEstado()).toBe("Listo");
    expect(itemPedido.estaListo()).toBe(true);
  });

  it("getSubtotal multiplica el precio del producto por la cantidad", () => {
    expect(itemPedido.getSubtotal()).toBe(5000);
  });

  it("validarModificacion no lanza error mientras esta Pendiente", () => {
    expect(() => itemPedido.validarModificacion()).not.toThrow();
  });

  it("validarModificacion lanza ErrorItemNoModificable si esta En Preparacion", () => {
    itemPedido.avanzarEstado();
    expect(() => itemPedido.validarModificacion()).toThrow(ErrorItemNoModificable);
  });

  it("validarModificacion lanza ErrorItemNoModificable si esta Listo", () => {
    itemPedido.avanzarEstado();
    itemPedido.avanzarEstado();
    expect(() => itemPedido.validarModificacion()).toThrow(ErrorItemNoModificable);
  });

  it("enviarACocina encola el item en la estacion de su producto", () => {
    itemPedido.enviarACocina();
    expect(estacion.recibirItem).toHaveBeenCalledWith(itemPedido);
  });
});
