import EstadoConfirmado from "../src/estadoConfirmado";
import EstadoListo from "../src/estadoListo";
import ErrorPedidoYaConfirmado from "../src/error/errorPedidoYaConfirmado";

describe("EstadoConfirmado", () => {
    let estado: EstadoConfirmado;

    beforeEach(() => {
        estado = new EstadoConfirmado();
    });

    describe("puedeModificar", () => {
        it("debe retornar false indicando que el pedido confirmado ya no admite modificaciones", () => {
            const resultado = estado.puedeModificar();
            expect(resultado).toBe(false);
        });
    });

    describe("puedeFacturarse", () => {
        it("debe retornar false indicando que aún no se puede facturar hasta estar listo", () => {
            const resultado = estado.puedeFacturarse();
            expect(resultado).toBe(false);
        });
    });

    describe("confirmar", () => {
        it("debe lanzar ErrorPedidoYaConfirmado si se intenta confirmar un pedido ya confirmado", () => {
            expect(() => {
                estado.confirmar();
            }).toThrow(ErrorPedidoYaConfirmado);
        });
    });

    describe("marcarListo", () => {
        it("debe transicionar retornando una instancia de EstadoListo", () => {
            const nuevoEstado = estado.marcarListo();
            expect(nuevoEstado).toBeInstanceOf(EstadoListo);
        });
    });
});