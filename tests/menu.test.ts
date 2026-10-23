import { mock, MockProxy } from "jest-mock-extended";
import Menu from "../src/menu";
import Comida from "../src/comida";

describe("Menu", () => {
  let milanesa: MockProxy<Comida>;
  let flan: MockProxy<Comida>;

  beforeEach(() => {
    milanesa = mock<Comida>();
    flan = mock<Comida>();
  });

  it("sin parámetros se crea vacío", () => {
    const menu = new Menu();
    expect(menu.getItems()).toHaveLength(0);
  });

  it("puede crearse con items iniciales", () => {
    const menu = new Menu([milanesa, flan]);
    expect(menu.getItems()).toHaveLength(2);
    expect(menu.getItems()[0]).toBe(milanesa);
    expect(menu.getItems()[1]).toBe(flan);
  });

  it("agregarItem agrega el item al final", () => {
    const menu = new Menu([milanesa]);
    menu.agregarItem(flan);
    expect(menu.getItems()).toHaveLength(2);
    expect(menu.getItems()[1]).toBe(flan);
  });

  it("quitarItem elimina solo el item indicado", () => {
    const menu = new Menu([milanesa, flan]);
    menu.quitarItem(milanesa);
    expect(menu.getItems()).toHaveLength(1);
    expect(menu.getItems()[0]).toBe(flan);
  });

  it("quitarItem elimina una sola ocurrencia si el item está repetido", () => {
    const menu = new Menu([milanesa, flan, milanesa]);
    menu.quitarItem(milanesa);
    expect(menu.getItems()).toHaveLength(2);
    expect(menu.getItems()[0]).toBe(flan);
    expect(menu.getItems()[1]).toBe(milanesa);
  });

  it("quitarItem con un item que no está no modifica el menú", () => {
    const menu = new Menu([milanesa]);
    menu.quitarItem(flan);
    expect(menu.getItems()).toHaveLength(1);
    expect(menu.getItems()[0]).toBe(milanesa);
  });

  it("agregar y quitar items no invoca métodos de la comida", () => {
    const menu = new Menu();
    menu.agregarItem(milanesa);
    menu.quitarItem(milanesa);
    expect(milanesa.getPrecio).not.toHaveBeenCalled();
    expect(milanesa.getDisponible).not.toHaveBeenCalled();
    expect(milanesa.chequearEstado).not.toHaveBeenCalled();
  });
});
