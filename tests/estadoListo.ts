import EstadoListo from "../src/estadoListo";
import ErrorPedidoYaListo from "../src/error/errorPedidoYaListo";

describe("EstadoListo", () => {
    let estado: EstadoListo;

    beforeEach(() => {
        estado = new EstadoListo();
    });

    describe("puedeModificar", () => {
        it("debe retornar false indicando que no admite modificaciones en estado listo", () => {
            const resultado = estado.puedeModificar();
            expect(resultado).toBe(false);
        });
    });

    describe("puedeFacturarse", () => {
        it("debe retornar true indicando que el pedido ya puede facturarse", () => {
            const resultado = estado.puedeFacturarse();
            expect(resultado).toBe(true);
        });
    });

    describe("confirmar", () => {
        it("debe lanzar ErrorPedidoYaListo si se intenta confirmar cuando ya está listo", () => {
            expect(() => {
                estado.confirmar();
            }).toThrow(ErrorPedidoYaListo);
        });
    });

    describe("marcarListo", () => {
        it("debe lanzar ErrorPedidoYaListo si se intenta volver a marcar como listo", () => {
            expect(() => {
                estado.marcarListo();
            }).toThrow(ErrorPedidoYaListo);
        });
    });
});