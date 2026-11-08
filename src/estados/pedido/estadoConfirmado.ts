/* eslint-disable @typescript-eslint/class-methods-use-this */

import ErrorPedidoNoFacturable from "../../error/errorPedidoNoFacturable";
import ErrorPedidoYaConfirmado from "../../error/errorPedidoYaConfirmado";
import EstadoListo from "./estadoListo";
import IEstadoPedido from "./iEstadoPedido";

/**
 * Pedido confirmado y enviado a cocina: ya no admite correcciones.
 * Solo puede pasar a listo; confirmarlo de nuevo o facturarlo lanza error.
 */
export default class EstadoConfirmado implements IEstadoPedido {
    public puedeModificar(): boolean {
        return false;
    }

    public puedeFacturarse(): boolean {
        return false;
    }

    public confirmar(): IEstadoPedido {
        throw new ErrorPedidoYaConfirmado("El pedido ya está confirmado.");
    }

    public marcarListo(): IEstadoPedido {
        return new EstadoListo();
    }

    public marcarFacturado(): IEstadoPedido {
        throw new ErrorPedidoNoFacturable("No se puede facturar un pedido que todavía no está listo.");
    }}