
import Item from "../src/item";
import Estacion from "../src/estacion";

class EstacionPrueba extends Estacion {}

describe("Item", () => {
  let estacion: EstacionPrueba;
  let item: Item;

  beforeEach(() => {
    estacion = new EstacionPrueba("Parrilla");
    item = new Item("Hamburguesa", true, 5000, estacion);
  });

  it("crea un item con su nombre y disponibilidad", () => {
    expect(item.getNombre()).toBe("Hamburguesa");
    expect(item.getDisponible()).toBe(true);
  });

  it("guarda y devuelve el precio", () => {
    expect(item.getPrecio()).toBe(5000);
  });

  it("permite actualizar el precio", () => {
    item.setPrecio(6000);

    expect(item.getPrecio()).toBe(6000);
  });

  it("guarda y devuelve la estacion asignada", () => {
    expect(item.getEstacion()).toBe(estacion);
  });

  it("permite cambiar la estacion", () => {
    const nuevaEstacion = new EstacionPrueba("Cocina fria");

    item.setEstacion(nuevaEstacion);

    expect(item.getEstacion()).toBe(nuevaEstacion);
  });

  it("comienza sin estar listo", () => {
    expect(item.estaListo()).toBe(false);
  });

  it("avanza de pendiente a en preparacion y luego a listo", () => {
    item.avanzarEstado();

    expect(item.estaListo()).toBe(false);

    item.avanzarEstado();

    expect(item.estaListo()).toBe(true);
  });
});
