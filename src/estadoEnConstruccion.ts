/* eslint-disable @typescript-eslint/class-methods-use-this */
 
import ErrorPedidoNoConfirmado from "./error/errorPedidoNoConfirmado";
import EstadoConfirmado from "./estadoConfirmado";
import IEstadoPedido from "./iEstadoPedido";

export default class EstadoEnConstruccion implements IEstadoPedido {
    public puedeModificar(): boolean {
        return true;
    }

    public puedeFacturarse(): boolean {
        return false;
    }

    public confirmar(): IEstadoPedido {
        return new EstadoConfirmado();
    }

    public marcarListo(): IEstadoPedido {
        throw new ErrorPedidoNoConfirmado("No se puede marcar como listo un pedido que aún está en construcción.");
    }
}