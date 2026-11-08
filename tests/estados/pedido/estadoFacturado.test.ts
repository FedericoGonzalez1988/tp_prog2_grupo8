import EstadoFacturado from "../../../src/estados/pedido/estadoFacturado";
import ErrorPedidoYaFacturado from "../../../src/error/errorPedidoYaFacturado";

describe("EstadoFacturado", () => {
    let estado: EstadoFacturado;

    beforeEach(() => {
        estado = new EstadoFacturado();
    });

    it("no admite modificaciones", () => {
        expect(estado.puedeModificar()).toBe(false);
    });

    it("no puede volver a facturarse", () => {
        expect(estado.puedeFacturarse()).toBe(false);
    });

    it("confirmar lanza ErrorPedidoYaFacturado", () => {
        expect(() => estado.confirmar()).toThrow(ErrorPedidoYaFacturado);
    });

    it("marcarListo lanza ErrorPedidoYaFacturado", () => {
        expect(() => estado.marcarListo()).toThrow(ErrorPedidoYaFacturado);
    });

    it("marcarFacturado lanza ErrorPedidoYaFacturado", () => {
        expect(() => estado.marcarFacturado()).toThrow(ErrorPedidoYaFacturado);
    });
});
