export default class ErrorPedidoYaConfirmado extends Error {
    public constructor(mensaje: string = "El pedido ya se encuentra confirmado.") {
        super(mensaje);
        this.name = "ErrorPedidoYaConfirmado";
    }
}