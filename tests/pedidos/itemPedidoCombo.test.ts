/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable max-lines-per-function */

import { mock, MockProxy } from "jest-mock-extended";
import ItemPedidoCombo from "../../src/pedidos/itemPedidoCombo";
import ItemPedidoSimple from "../../src/pedidos/itemPedidoSimple";
import Combo from "../../src/menu/combo";
import Producto from "../../src/menu/producto";
import Estacion from "../../src/cocina/estacion";
import IEstrategiaPrecioCombo from "../../src/menu/iEstrategiaPrecioCombo";
import ErrorItemNoModificable from "../../src/error/errorItemNoModificable";

describe("ItemPedidoCombo", () => {
  let parrilla: MockProxy<Estacion>;
  let barra: MockProxy<Estacion>;
  let hamburguesa: MockProxy<Producto>;
  let gaseosa: MockProxy<Producto>;
  let combo: Combo;
  let itemCombo: ItemPedidoCombo;

  beforeEach(() => {
    parrilla = mock<Estacion>();
    barra = mock<Estacion>();
    hamburguesa = mock<Producto>();
    gaseosa = mock<Producto>();
    hamburguesa.getDisponible.mockReturnValue(true);
    gaseosa.getDisponible.mockReturnValue(true);
    hamburguesa.getEstacion.mockReturnValue(parrilla);
    gaseosa.getEstacion.mockReturnValue(barra);
    const estrategia = mock<IEstrategiaPrecioCombo>();
    estrategia.calcularPrecio.mockReturnValue(3500);
    combo = new Combo("Combo Burger", true, "C1", [hamburguesa, gaseosa], estrategia);
    itemCombo = new ItemPedidoCombo(combo, 2);
  });

  it("guarda el combo y la cantidad", () => {
    expect(itemCombo.getCombo()).toBe(combo);
    expect(itemCombo.getCantidad()).toBe(2);
  });

  it("getDescripcion devuelve el nombre del combo", () => {
    expect(itemCombo.getDescripcion()).toBe("Combo Burger");
  });

  it("crea un ItemPedidoSimple por cada producto del combo, con la misma cantidad", () => {
    const componentes = itemCombo.getComponentes();

    expect(componentes).toHaveLength(2);
    expect(componentes[0]).toBeInstanceOf(ItemPedidoSimple);
    expect(componentes[0].getProducto()).toBe(hamburguesa);
    expect(componentes[1].getProducto()).toBe(gaseosa);
    expect(componentes.every(componente => componente.getCantidad() === 2)).toBe(true);
  });

  it("getSubtotal usa el precio del combo (con su beneficio) por la cantidad", () => {
    expect(itemCombo.getSubtotal()).toBe(7000);
  });

  it("no esta listo mientras algun componente no lo este", () => {
    const [componenteHamburguesa] = itemCombo.getComponentes();
    componenteHamburguesa.avanzarEstado();
    componenteHamburguesa.avanzarEstado();

    expect(itemCombo.estaListo()).toBe(false);
  });

  it("esta listo cuando todos sus componentes estan listos", () => {
    itemCombo.getComponentes().forEach(componente => {
      componente.avanzarEstado();
      componente.avanzarEstado();
    });

    expect(itemCombo.estaListo()).toBe(true);
  });

  it("validarModificacion no lanza error si todos los componentes estan Pendientes", () => {
    expect(() => itemCombo.validarModificacion()).not.toThrow();
  });

  it("validarModificacion lanza ErrorItemNoModificable si algun componente ya esta En Preparacion", () => {
    itemCombo.getComponentes()[1].avanzarEstado();
    expect(() => itemCombo.validarModificacion()).toThrow(ErrorItemNoModificable);
  });

  it("enviarACocina manda cada componente a la estacion de su producto", () => {
    const [componenteHamburguesa, componenteGaseosa] = itemCombo.getComponentes();

    itemCombo.enviarACocina();

    expect(parrilla.recibirItem).toHaveBeenCalledWith(componenteHamburguesa);
    expect(barra.recibirItem).toHaveBeenCalledWith(componenteGaseosa);
    expect(parrilla.recibirItem).toHaveBeenCalledTimes(1);
    expect(barra.recibirItem).toHaveBeenCalledTimes(1);
  });
});
