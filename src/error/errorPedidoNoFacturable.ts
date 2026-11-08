/** Error: Se intenta facturar un pedido que no esta listo o tiene items sin terminar. */
export default class ErrorPedidoNoFacturable extends Error {
    public constructor(mensaje: string = "El pedido no puede facturarse hasta que todos sus items esten listos.") {
        super(mensaje);
        this.name = "ErrorPedidoNoFacturable";
    }
}
