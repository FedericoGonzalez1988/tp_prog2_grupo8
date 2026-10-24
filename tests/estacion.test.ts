import { describe, it, expect, beforeEach } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';
import Estacion from '../src/estacion';
import Item from '../src/item';
import { NRO_CERO } from '../src/constants/constant';

const NOMBRE_INICIAL_ESTACION = 'Cocina Principal';
const NOMBRE_NUEVO_ESTACION = 'Barra Central';
const CANTIDAD_LLAMADOS_UNO = 1;

class EstacionDePrueba extends Estacion {
  public constructor(nombreEstacion: string) {
    super(nombreEstacion);
  }
}

describe('Estacion', (): void => {
  let itemMockUno: MockProxy<Item>;
  let itemMockDos: MockProxy<Item>;

  beforeEach((): void => {
    itemMockUno = mock<Item>();
    itemMockDos = mock<Item>();
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

  it('procesarSiguiente no realiza acciones si la cola de items esta vacia', (): void => {
    const estacionPrueba = new EstacionDePrueba(NOMBRE_INICIAL_ESTACION);
    estacionPrueba.procesarSiguiente();

    expect(itemMockUno.avanzarEstado).not.toHaveBeenCalled();
  });

  it('procesarSiguiente desencola un item y llama a avanzarEstado', (): void => {
    const estacionPrueba = new EstacionDePrueba(NOMBRE_INICIAL_ESTACION);
    estacionPrueba.recibirItem(itemMockUno);

    estacionPrueba.procesarSiguiente();

    expect(itemMockUno.avanzarEstado).toHaveBeenCalledTimes(CANTIDAD_LLAMADOS_UNO);
  });

  it('procesarSiguiente atiende los items en orden FIFO', (): void => {
    const estacionPrueba = new EstacionDePrueba(NOMBRE_INICIAL_ESTACION);

    estacionPrueba.recibirItem(itemMockUno);
    estacionPrueba.recibirItem(itemMockDos);

    estacionPrueba.procesarSiguiente();
    expect(itemMockUno.avanzarEstado).toHaveBeenCalledTimes(CANTIDAD_LLAMADOS_UNO);
    expect(itemMockDos.avanzarEstado).toHaveBeenCalledTimes(NRO_CERO);

    estacionPrueba.procesarSiguiente();
    expect(itemMockDos.avanzarEstado).toHaveBeenCalledTimes(CANTIDAD_LLAMADOS_UNO);
  });
});