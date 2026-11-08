/* eslint-disable @typescript-eslint/class-methods-use-this */

import ErrorPedidoYaFacturado from "./error/errorPedidoYaFacturado";
import IEstadoPedido from "./iEstadoPedido";

/** Estado final del pedido: ya fue cobrado y forma parte del historial. */
export default class EstadoFacturado implements IEstadoPedido {
    public puedeModificar(): boolean {
        return false;
    }

    public puedeFacturarse(): boolean {
        return false;
    }

    public confirmar(): IEstadoPedido {
        throw new ErrorPedidoYaFacturado("El pedido ya fue facturado; no se puede volver a confirmar.");
    }

    public marcarListo(): IEstadoPedido {
        throw new ErrorPedidoYaFacturado("El pedido ya fue facturado; no se puede volver a marcar como listo.");
    }

    public marcarFacturado(): IEstadoPedido {
        throw new ErrorPedidoYaFacturado("El pedido ya fue facturado.");
    }
}
