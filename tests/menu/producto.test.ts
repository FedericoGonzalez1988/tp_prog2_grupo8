
import Producto from "../../src/menu/producto";
import Estacion from "../../src/cocina/estacion";
import ItemPedidoSimple from "../../src/pedidos/itemPedidoSimple";

class EstacionPrueba extends Estacion {}

describe("Producto", () => {
  let estacion: EstacionPrueba;
  let producto: Producto;

  beforeEach(() => {
    estacion = new EstacionPrueba("Parrilla");
    producto = new Producto("Hamburguesa", true, 5000, estacion);
  });

  it("crea un producto con su nombre y disponibilidad", () => {
    expect(producto.getNombre()).toBe("Hamburguesa");
    expect(producto.getDisponible()).toBe(true);
  });

  it("guarda y devuelve el precio", () => {
    expect(producto.getPrecio()).toBe(5000);
  });

  it("permite actualizar el precio", () => {
    producto.setPrecio(6000);

    expect(producto.getPrecio()).toBe(6000);
  });

  it("guarda y devuelve la estacion asignada", () => {
    expect(producto.getEstacion()).toBe(estacion);
  });

  it("permite cambiar la estacion", () => {
    const nuevaEstacion = new EstacionPrueba("Cocina fria");

    producto.setEstacion(nuevaEstacion);

    expect(producto.getEstacion()).toBe(nuevaEstacion);
  });

  it("crearItemPedido devuelve un ItemPedidoSimple de este producto con la cantidad indicada", () => {
    const itemPedido = producto.crearItemPedido(2);

    expect(itemPedido).toBeInstanceOf(ItemPedidoSimple);
    expect((itemPedido as ItemPedidoSimple).getProducto()).toBe(producto);
    expect(itemPedido.getCantidad()).toBe(2);
  });

  it("cada llamada a crearItemPedido crea un item distinto (el estado no se comparte)", () => {
    const itemUno = producto.crearItemPedido(1) as ItemPedidoSimple;
    const itemDos = producto.crearItemPedido(1) as ItemPedidoSimple;

    itemUno.avanzarEstado();

    expect(itemUno).not.toBe(itemDos);
    expect(itemUno.getNombreEstado()).toBe("En Preparacion");
    expect(itemDos.getNombreEstado()).toBe("Pendiente");
  });
});
