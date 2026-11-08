import { mock, MockProxy } from "jest-mock-extended";
import Combo from "../../src/menu/combo";
import Producto from "../../src/menu/producto";
import ItemPedidoCombo from "../../src/pedidos/itemPedidoCombo";
import IEstrategiaPrecioCombo from "../../src/menu/iEstrategiaPrecioCombo";
import ErrorItemsInsuficientesParaCombo from "../../src/error/errorItemsInsuficientesParaCombo";
import ErrorItemsNoDisponiblesEnCombo from "../../src/error/errorItemsNoDisponiblesEnCombo";

describe("Combo", () => {
  let hamburguesa: MockProxy<Producto>;
  let gaseosa: MockProxy<Producto>;
  let estrategia: MockProxy<IEstrategiaPrecioCombo>;

  beforeEach(() => {
    hamburguesa = mock<Producto>();
    gaseosa = mock<Producto>();
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

    it("lanza ErrorItemsInsuficientesParaCombo con un solo producto", () => {
      expect(() => new Combo("Combo Burger", true, "C1", [hamburguesa], estrategia))
        .toThrow(ErrorItemsInsuficientesParaCombo);
    });

    it("lanza ErrorItemsInsuficientesParaCombo sin productos", () => {
      expect(() => new Combo("Combo Burger", true, "C1", [], estrategia))
        .toThrow(ErrorItemsInsuficientesParaCombo);
    });

    it("lanza ErrorItemsNoDisponiblesEnCombo si algún producto no está disponible", () => {
      gaseosa.getDisponible.mockReturnValue(false);
      expect(() => new Combo("Combo Burger", true, "C1", [hamburguesa, gaseosa], estrategia))
        .toThrow(ErrorItemsNoDisponiblesEnCombo);
    });
  });

  describe("getProductos", () => {
    it("devuelve los productos del combo en el orden en que se crearon", () => {
      const combo = new Combo("Combo Burger", true, "C1", [hamburguesa, gaseosa], estrategia);
      expect(combo.getProductos()).toEqual([hamburguesa, gaseosa]);
    });
  });

  describe("getPrecio", () => {
    it("le pasa a la estrategia la suma de los precios y devuelve su resultado", () => {
      estrategia.calcularPrecio.calledWith(4000).mockReturnValue(3500);
      const combo = new Combo("Combo Burger", true, "C1", [hamburguesa, gaseosa], estrategia);
      expect(combo.getPrecio()).toBe(3500);
      expect(estrategia.calcularPrecio).toHaveBeenCalledTimes(1);
    });

    it("consulta el precio actual de cada producto", () => {
      const combo = new Combo("Combo Burger", true, "C1", [hamburguesa, gaseosa], estrategia);
      combo.getPrecio();
      expect(hamburguesa.getPrecio).toHaveBeenCalledTimes(1);
      expect(gaseosa.getPrecio).toHaveBeenCalledTimes(1);
    });
  });

  describe("crearItemPedido", () => {
    it("devuelve un ItemPedidoCombo de este combo con la cantidad indicada", () => {
      const combo = new Combo("Combo Burger", true, "C1", [hamburguesa, gaseosa], estrategia);

      const itemPedido = combo.crearItemPedido(2);

      expect(itemPedido).toBeInstanceOf(ItemPedidoCombo);
      expect((itemPedido as ItemPedidoCombo).getCombo()).toBe(combo);
      expect(itemPedido.getCantidad()).toBe(2);
    });
  });
});
