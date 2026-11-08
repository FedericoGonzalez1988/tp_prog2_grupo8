import { mock, MockProxy } from "jest-mock-extended";
import PedidoSalon from "../src/pedidoSalon";
import PedidoParaLlevar from "../src/pedidoParaLlevar";
import Empleado from "../src/empleado";
import Comida from "../src/comida";
import Producto from "../src/producto";
import Combo from "../src/combo";
import ItemPedido from "../src/itemPedido";
import ItemPedidoSimple from "../src/itemPedidoSimple";
import Parrilla from "../src/parrilla";
import Barra from "../src/barra";
import EstrategiaComboPorcentaje from "../src/estrategiaComboPorcentaje";
import ErrorComidaNoDisponible from "../src/error/errorComidaNoDisponible";
import ErrorPedidoYaConfirmado from "../src/error/errorPedidoYaConfirmado";
import ErrorPedidoNoConfirmado from "../src/error/errorPedidoNoConfirmado";
import ErrorItemNoModificable from "../src/error/errorItemNoModificable";
import ErrorPedidoNoFacturable from "../src/error/errorPedidoNoFacturable";

describe("Pedido", () => {
  let parrilla: Parrilla;
  let barra: Barra;
  let milanesa: Producto;
  let hamburguesa: Producto;
  let gaseosa: Producto;
  let comboBurger: Combo;
  let pedido: PedidoSalon;

  beforeEach(() => {
    parrilla = new Parrilla();
    barra = new Barra();
    milanesa = new Producto("Milanesa", true, 6000, parrilla);
    hamburguesa = new Producto("Hamburguesa", true, 5000, parrilla);
    gaseosa = new Producto("Gaseosa", true, 1000, barra);
    comboBurger = new Combo("Combo Burger", true, "C1", [hamburguesa, gaseosa], new EstrategiaComboPorcentaje(10));
    pedido = new PedidoSalon("P-1", [], "Mesa 4", mock<Empleado>());
  });

  /** Devuelve una Comida falsa cuyo ItemPedido no se puede modificar. */
  function comidaConItemNoModificable(): { comida: MockProxy<Comida>; item: MockProxy<ItemPedido> } {
    const comida = mock<Comida>();
    const item = mock<ItemPedido>();
    comida.getDisponible.mockReturnValue(true);
    comida.crearItemPedido.mockReturnValue(item);
    item.validarModificacion.mockImplementation(() => {
      throw new ErrorItemNoModificable("en preparacion");
    });
    return { comida, item };
  }

  describe("creacion", () => {
    it("guarda el numero de pedido y empieza sin items", () => {
      expect(pedido.getNumeroPedido()).toBe("P-1");
      expect(pedido.getItems()).toHaveLength(0);
    });

    it("convierte los productos recibidos en el constructor en items del pedido", () => {
      const pedidoConProductos = new PedidoSalon("P-2", [milanesa, gaseosa], "Mesa 1", mock<Empleado>());

      const items = pedidoConProductos.getItems() as ItemPedidoSimple[];
      expect(items).toHaveLength(2);
      expect(items[0].getProducto()).toBe(milanesa);
      expect(items[1].getProducto()).toBe(gaseosa);
    });
  });

  describe("agregarProducto", () => {
    it("crea un item con cantidad 1 por defecto", () => {
      pedido.agregarProducto(milanesa);

      expect(pedido.getItems()).toHaveLength(1);
      expect(pedido.getItems()[0].getCantidad()).toBe(1);
    });

    it("crea un item con la cantidad indicada", () => {
      pedido.agregarProducto(milanesa, 3);
      expect(pedido.getItems()[0].getCantidad()).toBe(3);
    });

    it("lanza ErrorComidaNoDisponible si el producto no esta disponible", () => {
      milanesa.setDisponible(false);
      expect(() => pedido.agregarProducto(milanesa)).toThrow(ErrorComidaNoDisponible);
      expect(pedido.getItems()).toHaveLength(0);
    });

    it("lanza ErrorPedidoYaConfirmado si el pedido ya fue confirmado", () => {
      pedido.confirmar();
      expect(() => pedido.agregarProducto(milanesa)).toThrow(ErrorPedidoYaConfirmado);
    });
  });

  describe("quitarItem", () => {
    it("quita el item indicado", () => {
      pedido.agregarProducto(milanesa);
      pedido.agregarProducto(gaseosa);
      const [itemMilanesa, itemGaseosa] = pedido.getItems();

      pedido.quitarItem(itemMilanesa);

      expect(pedido.getItems()).toEqual([itemGaseosa]);
    });

    it("no hace nada si el item no pertenece al pedido", () => {
      pedido.agregarProducto(milanesa);
      pedido.quitarItem(new ItemPedidoSimple(gaseosa, 1));
      expect(pedido.getItems()).toHaveLength(1);
    });

    it("no quita un item que ya no se puede modificar", () => {
      const { comida, item } = comidaConItemNoModificable();
      pedido.agregarProducto(comida);

      expect(() => pedido.quitarItem(item)).toThrow(ErrorItemNoModificable);
      expect(pedido.getItems()).toEqual([item]);
    });

    it("lanza ErrorPedidoYaConfirmado si el pedido ya fue confirmado", () => {
      pedido.agregarProducto(milanesa);
      pedido.confirmar();
      expect(() => pedido.quitarItem(pedido.getItems()[0])).toThrow(ErrorPedidoYaConfirmado);
    });
  });

  describe("confirmar", () => {
    it("envia cada item a su estacion y los combos se reparten entre estaciones", () => {
      pedido.agregarProducto(milanesa);
      pedido.agregarProducto(comboBurger);

      pedido.confirmar();

      const itemMilanesa = pedido.getItems()[0] as ItemPedidoSimple;
      expect(parrilla.procesarSiguiente()).toBe(itemMilanesa);
      expect(parrilla.procesarSiguiente()?.getProducto()).toBe(hamburguesa);
      expect(barra.procesarSiguiente()?.getProducto()).toBe(gaseosa);
      expect(parrilla.procesarSiguiente()).toBeUndefined();
      expect(barra.procesarSiguiente()).toBeUndefined();
    });

    it("lanza ErrorPedidoYaConfirmado si se confirma dos veces", () => {
      pedido.confirmar();
      expect(() => pedido.confirmar()).toThrow(ErrorPedidoYaConfirmado);
    });
  });

  describe("calcularSubtotal y calcularTotal", () => {
    it("devuelve 0 si el pedido no tiene items", () => {
      expect(pedido.calcularSubtotal()).toBe(0);
      expect(pedido.calcularTotal()).toBe(0);
    });

    it("sin cargos extra, el total es igual al subtotal", () => {
      pedido.agregarProducto(milanesa, 2);
      expect(pedido.calcularSubtotal()).toBe(12000);
      expect(pedido.calcularTotal()).toBe(12000);
    });

    it("suma los subtotales de productos y combos con su beneficio", () => {
      pedido.agregarProducto(milanesa, 2);
      pedido.agregarProducto(comboBurger);

      // 2 x 6000 + (5000 + 1000) con 10% de descuento
      expect(pedido.calcularTotal()).toBe(12000 + 5400);
    });
  });

  describe("marcarListo y puedeFacturarse", () => {
    it("no se puede marcar listo un pedido en construccion", () => {
      expect(() => pedido.marcarListo()).toThrow(ErrorPedidoNoConfirmado);
    });

    it("no puede facturarse mientras esta en construccion", () => {
      expect(pedido.puedeFacturarse()).toBe(false);
    });

    it("no puede facturarse si algun item no esta listo, aunque el pedido este marcado listo", () => {
      pedido.agregarProducto(milanesa);
      pedido.confirmar();
      pedido.marcarListo();

      expect(pedido.puedeFacturarse()).toBe(false);
    });

    it("no puede facturarse si esta confirmado pero todavia no se marco listo", () => {
      pedido.agregarProducto(milanesa);
      pedido.confirmar();
      parrilla.procesarSiguiente()?.avanzarEstado();

      expect(pedido.puedeFacturarse()).toBe(false);
    });

    it("puede facturarse cuando esta listo y todos sus items (incluidos los del combo) estan listos", () => {
      pedido.agregarProducto(milanesa);
      pedido.agregarProducto(comboBurger);
      pedido.confirmar();

      // cada estacion toma sus items en orden y el cocinero los marca listos
      parrilla.procesarSiguiente()?.avanzarEstado();
      parrilla.procesarSiguiente()?.avanzarEstado();
      barra.procesarSiguiente()?.avanzarEstado();
      pedido.marcarListo();

      expect(pedido.puedeFacturarse()).toBe(true);
    });
  });

  describe("marcarFacturado", () => {
    it("no se puede facturar un pedido en construccion", () => {
      expect(() => pedido.marcarFacturado()).toThrow(ErrorPedidoNoFacturable);
    });

    it("un pedido listo pasa a facturado y ya no puede facturarse ni modificarse", () => {
      pedido.confirmar();
      pedido.marcarListo();

      pedido.marcarFacturado();

      expect(pedido.puedeFacturarse()).toBe(false);
      expect(() => pedido.agregarProducto(milanesa)).toThrow(ErrorPedidoYaConfirmado);
    });
  });

  describe("deshacerUltimoItem (IPedidoModificable)", () => {
    it("quita y devuelve el ultimo item cargado", () => {
      pedido.agregarProducto(milanesa);
      pedido.agregarProducto(gaseosa);
      const [itemMilanesa, itemGaseosa] = pedido.getItems();

      expect(pedido.deshacerUltimoItem()).toBe(itemGaseosa);
      expect(pedido.getItems()).toEqual([itemMilanesa]);
    });

    it("devuelve null si no hay modificaciones para deshacer", () => {
      expect(pedido.deshacerUltimoItem()).toBeNull();
    });

    it("si la ultima modificacion fue quitar, vuelve a poner el item en su lugar", () => {
      pedido.agregarProducto(milanesa);
      pedido.agregarProducto(gaseosa);
      const [itemMilanesa, itemGaseosa] = pedido.getItems();
      pedido.quitarItem(itemMilanesa);

      expect(pedido.deshacerUltimoItem()).toBe(itemMilanesa);
      expect(pedido.getItems()).toEqual([itemMilanesa, itemGaseosa]);
    });

    it("deshace las modificaciones de a una, de la mas nueva a la mas vieja", () => {
      pedido.agregarProducto(milanesa);
      pedido.agregarProducto(gaseosa);
      const [itemMilanesa, itemGaseosa] = pedido.getItems();
      pedido.quitarItem(itemMilanesa);

      pedido.deshacerUltimoItem();   // deshace "quitar milanesa"
      expect(pedido.getItems()).toEqual([itemMilanesa, itemGaseosa]);

      pedido.deshacerUltimoItem();   // deshace "agregar gaseosa"
      expect(pedido.getItems()).toEqual([itemMilanesa]);

      pedido.deshacerUltimoItem();   // deshace "agregar milanesa"
      expect(pedido.getItems()).toEqual([]);

      expect(pedido.deshacerUltimoItem()).toBeNull();
    });

    it("despues de quitarHastaItem, deshace volviendo a poner los items de a uno", () => {
      pedido.agregarProducto(milanesa);
      pedido.agregarProducto(gaseosa);
      pedido.agregarProducto(comboBurger);
      const [itemMilanesa, itemGaseosa, itemCombo] = pedido.getItems();
      pedido.quitarHastaItem(itemGaseosa);

      pedido.deshacerUltimoItem();
      expect(pedido.getItems()).toEqual([itemMilanesa, itemGaseosa]);

      pedido.deshacerUltimoItem();
      expect(pedido.getItems()).toEqual([itemMilanesa, itemGaseosa, itemCombo]);
    });

    it("no quita el ultimo item si ya no se puede modificar", () => {
      const { comida, item } = comidaConItemNoModificable();
      pedido.agregarProducto(comida);

      expect(() => pedido.deshacerUltimoItem()).toThrow(ErrorItemNoModificable);
      expect(pedido.getItems()).toEqual([item]);
    });

    it("lanza ErrorPedidoYaConfirmado si el pedido ya fue confirmado", () => {
      pedido.agregarProducto(milanesa);
      pedido.confirmar();
      expect(() => pedido.deshacerUltimoItem()).toThrow(ErrorPedidoYaConfirmado);
    });
  });

  describe("quitarHastaItem (IPedidoModificable)", () => {
    it("borra desde el ultimo item hasta el indicado, inclusive", () => {
      pedido.agregarProducto(milanesa);
      pedido.agregarProducto(gaseosa);
      pedido.agregarProducto(comboBurger);
      const [itemMilanesa, itemGaseosa] = pedido.getItems();

      pedido.quitarHastaItem(itemGaseosa);

      expect(pedido.getItems()).toEqual([itemMilanesa]);
    });

    it("no hace nada si el item no pertenece al pedido", () => {
      pedido.agregarProducto(milanesa);
      pedido.quitarHastaItem(new ItemPedidoSimple(gaseosa, 1));
      expect(pedido.getItems()).toHaveLength(1);
    });

    it("no quita nada si alguno de los items a borrar ya no se puede modificar", () => {
      pedido.agregarProducto(milanesa);
      const { comida } = comidaConItemNoModificable();
      pedido.agregarProducto(comida);
      const itemsAntes = [...pedido.getItems()];

      expect(() => pedido.quitarHastaItem(itemsAntes[0])).toThrow(ErrorItemNoModificable);
      expect(pedido.getItems()).toEqual(itemsAntes);
    });

    it("lanza ErrorPedidoYaConfirmado si el pedido ya fue confirmado", () => {
      pedido.agregarProducto(milanesa);
      pedido.confirmar();
      expect(() => pedido.quitarHastaItem(pedido.getItems()[0])).toThrow(ErrorPedidoYaConfirmado);
    });
  });
});

describe("PedidoParaLlevar", () => {
  it("permite deshacer y corregir items como PedidoSalon", () => {
    const parrilla = new Parrilla();
    const milanesa = new Producto("Milanesa", true, 6000, parrilla);
    const hamburguesa = new Producto("Hamburguesa", true, 5000, parrilla);
    const pedido = new PedidoParaLlevar("P-3", [milanesa, hamburguesa, milanesa], new Date());
    const [itemUno, itemDos] = pedido.getItems();

    pedido.deshacerUltimoItem();
    expect(pedido.getItems()).toEqual([itemUno, itemDos]);

    pedido.quitarHastaItem(itemDos);
    expect(pedido.getItems()).toEqual([itemUno]);
  });
});
