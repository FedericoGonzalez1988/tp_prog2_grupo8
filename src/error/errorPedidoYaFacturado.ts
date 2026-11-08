/** Error: Se intenta operar sobre un pedido que ya fue facturado. */
export default class ErrorPedidoYaFacturado extends Error {
    public constructor(mensaje: string = "El pedido ya fue facturado.") {
        super(mensaje);
        this.name = "ErrorPedidoYaFacturado";
    }
}
