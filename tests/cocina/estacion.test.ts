import { describe, it, expect, beforeEach } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';
import Estacion from '../../src/cocina/estacion';
import ItemPedidoSimple from '../../src/pedidos/itemPedidoSimple';
import { NRO_CERO } from '../../src/constants/constant';

const NOMBRE_INICIAL_ESTACION = 'Cocina Principal';
const NOMBRE_NUEVO_ESTACION = 'Barra Central';
const CANTIDAD_LLAMADOS_UNO = 1;

class EstacionDePrueba extends Estacion {
  public constructor(nombreEstacion: string) {
    super(nombreEstacion);
  }
}

describe('Estacion', (): void => {
  let itemMockUno: MockProxy<ItemPedidoSimple>;
  let itemMockDos: MockProxy<ItemPedidoSimple>;

  beforeEach((): void => {
    itemMockUno = mock<ItemPedidoSimple>();
    itemMockDos = mock<ItemPedidoSimple>();
  });

  it('getNombreEstacion devuelve el nombre indicado en el constructor', (): void => {
    const estacionPrueba = new EstacionDePrueba(NOMBRE_INICIAL_ESTACION);
    expect(estacionPrueba.getNombreEstacion()).toBe(NOMBRE_INICIAL_ESTACION);
  });

  it('setNombreEstacion modifica correctamente el nombre de la estacion', (): void => {
    const estacionPrueba = new EstacionDePrueba(NOMBRE_INICIAL_ESTACION);
    estacionPrueba.setNombreEstacion(NOMBRE_NUEVO_ESTACION);
    expect(estacionPrueba.getNombreEstacion()).toBe(NOMBRE_NUEVO_ESTACION);
  });

  it('procesarSiguiente devuelve undefined y no realiza acciones si la cola esta vacia', (): void => {
    const estacionPrueba = new EstacionDePrueba(NOMBRE_INICIAL_ESTACION);

    const itemProcesado = estacionPrueba.procesarSiguiente();

    expect(itemProcesado).toBeUndefined();
    expect(itemMockUno.avanzarEstado).not.toHaveBeenCalled();
  });

  it('procesarSiguiente desencola un item, llama a avanzarEstado y lo devuelve', (): void => {
    const estacionPrueba = new EstacionDePrueba(NOMBRE_INICIAL_ESTACION);
    estacionPrueba.recibirItem(itemMockUno);

    const itemProcesado = estacionPrueba.procesarSiguiente();

    expect(itemMockUno.avanzarEstado).toHaveBeenCalledTimes(CANTIDAD_LLAMADOS_UNO);
    expect(itemProcesado).toBe(itemMockUno);
  });

  it('procesarSiguiente atiende los items en orden FIFO', (): void => {
    const estacionPrueba = new EstacionDePrueba(NOMBRE_INICIAL_ESTACION);

    estacionPrueba.recibirItem(itemMockUno);
    estacionPrueba.recibirItem(itemMockDos);

    expect(estacionPrueba.procesarSiguiente()).toBe(itemMockUno);
    expect(itemMockUno.avanzarEstado).toHaveBeenCalledTimes(CANTIDAD_LLAMADOS_UNO);
    expect(itemMockDos.avanzarEstado).toHaveBeenCalledTimes(NRO_CERO);

    expect(estacionPrueba.procesarSiguiente()).toBe(itemMockDos);
    expect(itemMockDos.avanzarEstado).toHaveBeenCalledTimes(CANTIDAD_LLAMADOS_UNO);
  });
});
