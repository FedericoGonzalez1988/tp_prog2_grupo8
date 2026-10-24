import { describe, it, expect, beforeEach } from "@jest/globals";
import { mock, MockProxy } from "jest-mock-extended";
import PedidoDelivery from "../src/pedidoDelivery";
import Empleado from "../src/empleado";
import Comida from "../src/comida";
import ErrorComidaNoDisponible from "../src/error/errorComidaNoDisponible";

const NUMERO_PEDIDO_MUESTRA = "PED-001";
const DIRECCION_ENTREGA_MUESTRA = "Carlos Villate 4480";
const COSTO_ENVIO_MUESTRA = 500;
const CANTIDAD_PRODUCTOS_UNO = 1;

describe("PedidoDelivery - Creación e Instanciación", (): void => {
  let cadeteMock: MockProxy<Empleado>;

  beforeEach((): void => {
    cadeteMock = mock<Empleado>();
  });

  it("se instancia correctamente con parámetros indicados", (): void => {
    const pedidoDelivery = new PedidoDelivery(
      NUMERO_PEDIDO_MUESTRA,
      [],
      cadeteMock,
      DIRECCION_ENTREGA_MUESTRA,
      COSTO_ENVIO_MUESTRA
    );

    expect(pedidoDelivery).toBeDefined();
  });
});

describe("PedidoDelivery - Agregar Productos", (): void => {
  let cadeteMock: MockProxy<Empleado>;
  let productoDisponibleMock: MockProxy<Comida>;
  let productoNoDisponibleMock: MockProxy<Comida>;

  beforeEach((): void => {
    cadeteMock = mock<Empleado>();
    productoDisponibleMock = mock<Comida>();
    productoNoDisponibleMock = mock<Comida>();

    productoDisponibleMock.getDisponible.mockReturnValue(true);
    productoNoDisponibleMock.getDisponible.mockReturnValue(false);
  });

  it("agrega un producto correctamente si este se encuentra disponible", (): void => {
    const pedidoDelivery = new PedidoDelivery(
      NUMERO_PEDIDO_MUESTRA,
      [],
      cadeteMock,
      DIRECCION_ENTREGA_MUESTRA,
      COSTO_ENVIO_MUESTRA
    );

    pedidoDelivery.agregarProducto(productoDisponibleMock);

    expect(productoDisponibleMock.getDisponible).toHaveBeenCalledTimes(CANTIDAD_PRODUCTOS_UNO);
  });

  it("lanza ErrorComidaNoDisponible al intentar agregar un producto no disponible", (): void => {
    const pedidoDelivery = new PedidoDelivery(
      NUMERO_PEDIDO_MUESTRA,
      [],
      cadeteMock,
      DIRECCION_ENTREGA_MUESTRA,
      COSTO_ENVIO_MUESTRA
    );

    expect((): void => {
      pedidoDelivery.agregarProducto(productoNoDisponibleMock);
    }).toThrow(ErrorComidaNoDisponible);
  });
});