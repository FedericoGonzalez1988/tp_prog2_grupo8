import { mock, MockProxy } from "jest-mock-extended";
import Combo from "../src/combo";
import Item from "../src/item";
import IEstrategiaPrecioCombo from "../src/iEstrategiaPrecioCombo";
import ErrorItemsInsuficientesParaCombo from "../src/error/errorItemsInsuficientesParaCombo";
import ErrorItemsNoDisponiblesEnCombo from "../src/error/errorItemsNoDisponiblesEnCombo";

describe("Combo", () => {
  let hamburguesa: MockProxy<Item>;
  let gaseosa: MockProxy<Item>;
  let estrategia: MockProxy<IEstrategiaPrecioCombo>;

  beforeEach(() => {
    hamburguesa = mock<Item>();
    gaseosa = mock<Item>();
    estrategia = mock<IEstrategiaPrecioCombo>();
    hamburguesa.getDisponible.mockReturnValue(true);
    gaseosa.getDisponible.mockReturnValue(true);
    hamburguesa.getPrecio.mockReturnValue(3000);
    gaseosa.getPrecio.mockReturnValue(1000);
  });

  describe("constructor", () => {
    it("crea el combo con nombre, id y disponibilidad", () => {
      const combo = new Combo("Combo Burger", true, "C1", [hamburguesa, gaseosa], estrategia);
      expect(combo.getNombre()).toBe("Combo Burger");
      expect(combo.getIdCombo()).toBe("C1");
      expect(combo.getDisponible()).toBe(true);
    });

    it("lanza ErrorItemsInsuficientesParaCombo con un solo item", () => {
      expect(() => new Combo("Combo Burger", true, "C1", [hamburguesa], estrategia))
        .toThrow(ErrorItemsInsuficientesParaCombo);
    });

    it("lanza ErrorItemsInsuficientesParaCombo sin items", () => {
      expect(() => new Combo("Combo Burger", true, "C1", [], estrategia))
        .toThrow(ErrorItemsInsuficientesParaCombo);
    });

    it("lanza ErrorItemsNoDisponiblesEnCombo si algún item no está disponible", () => {
      gaseosa.getDisponible.mockReturnValue(false);
      expect(() => new Combo("Combo Burger", true, "C1", [hamburguesa, gaseosa], estrategia))
        .toThrow(ErrorItemsNoDisponiblesEnCombo);
    });
  });

  describe("getPrecio", () => {
    it("le pasa a la estrategia la suma de los precios y devuelve su resultado", () => {
      estrategia.calcularPrecio.calledWith(4000).mockReturnValue(3500);
      const combo = new Combo("Combo Burger", true, "C1", [hamburguesa, gaseosa], estrategia);
      expect(combo.getPrecio()).toBe(3500);
      expect(estrategia.calcularPrecio).toHaveBeenCalledTimes(1);
    });

    it("consulta el precio actual de cada item", () => {
      const combo = new Combo("Combo Burger", true, "C1", [hamburguesa, gaseosa], estrategia);
      combo.getPrecio();
      expect(hamburguesa.getPrecio).toHaveBeenCalledTimes(1);
      expect(gaseosa.getPrecio).toHaveBeenCalledTimes(1);
    });
  });

  describe("estaListo", () => {
    it("devuelve true si todos los items están listos", () => {
      hamburguesa.estaListo.mockReturnValue(true);
      gaseosa.estaListo.mockReturnValue(true);
      const combo = new Combo("Combo Burger", true, "C1", [hamburguesa, gaseosa], estrategia);
      expect(combo.estaListo()).toBe(true);
    });

    it("devuelve false si algún item no está listo", () => {
      hamburguesa.estaListo.mockReturnValue(true);
      gaseosa.estaListo.mockReturnValue(false);
      const combo = new Combo("Combo Burger", true, "C1", [hamburguesa, gaseosa], estrategia);
      expect(combo.estaListo()).toBe(false);
    });
  });
});
