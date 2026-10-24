export default class ErrorPedidoNoConfirmado extends Error {
    public constructor(mensaje: string = "No se puede marcar como listo un pedido que no ha sido confirmado.") {
        super(mensaje);
        this.name = "ErrorPedidoNoConfirmado";
    }
}