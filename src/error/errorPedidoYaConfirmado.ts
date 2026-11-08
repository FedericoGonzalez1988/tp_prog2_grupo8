/** Error: Se intenta modificar o confirmar un pedido que ya fue confirmado. */
export default class ErrorPedidoYaConfirmado extends Error {
    public constructor(mensaje: string = "El pedido ya se encuentra confirmado.") {
        super(mensaje);
        this.name = "ErrorPedidoYaConfirmado";
    }
}