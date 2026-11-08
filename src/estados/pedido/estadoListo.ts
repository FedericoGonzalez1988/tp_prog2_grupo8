/* eslint-disable @typescript-eslint/class-methods-use-this */

import ErrorPedidoYaListo from "../../error/errorPedidoYaListo";
import EstadoFacturado from "./estadoFacturado";
import IEstadoPedido from "./iEstadoPedido";

/**
 * Pedido listo: es el unico estado que permite facturar.
 * Solo puede pasar a facturado; confirmarlo o marcarlo listo de nuevo lanza error.
 */
export default class EstadoListo implements IEstadoPedido {
    public puedeModificar(): boolean {
        return false;
    }

    public puedeFacturarse(): boolean {
        return true;
    }

    public confirmar(): IEstadoPedido {
        throw new ErrorPedidoYaListo("El pedido ya está listo; no se puede volver a confirmar.");
    }

    public marcarListo(): IEstadoPedido {
        throw new ErrorPedidoYaListo("El pedido ya se encuentra listo.");
    }

    public marcarFacturado(): IEstadoPedido {
        return new EstadoFacturado();
    }
}