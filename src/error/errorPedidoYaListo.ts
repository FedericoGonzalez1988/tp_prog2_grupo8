/** Error: Se intenta confirmar o marcar como listo un pedido que ya esta listo. */
export default class ErrorPedidoYaListo extends Error {
    public constructor(mensaje: string = "El pedido ya se encuentra listo.") {
        super(mensaje);
        this.name = "ErrorPedidoYaListo";
    }
}