import ErrorPedidoNoConfirmado from "../src/error/errorPedidoNoConfirmado";
import EstadoConfirmado from "../src/estadoConfirmado";
import EstadoEnConstruccion from "../src/estadoEnConstruccion";

describe("EstadoEnConstruccion", () => {
    let estado: EstadoEnConstruccion;

    beforeEach(() => {
        estado = new EstadoEnConstruccion();
    });

    describe("puedeModificar", () => {
        it("debe retornar true indicando que el pedido permite modificaciones", () => {
            const resultado = estado.puedeModificar();
            expect(resultado).toBe(true);
        });
    });

    describe("puedeFacturarse", () => {
        it("debe retornar false indicando que no se puede facturar en construcción", () => {
            const resultado = estado.puedeFacturarse();
            expect(resultado).toBe(false);
        });
    });

    describe("confirmar", () => {
        it("debe transicionar retornando una instancia de EstadoConfirmado", () => {
            const nuevoEstado = estado.confirmar();
            expect(nuevoEstado).toBeInstanceOf(EstadoConfirmado);
        });
    });

    describe("marcarListo", () => {
        it("debe lanzar ErrorPedidoNoConfirmado al intentar marcar como listo sin confirmar", () => {
            expect(() => {
                estado.marcarListo();
            }).toThrow(ErrorPedidoNoConfirmado);
        });
    });
});