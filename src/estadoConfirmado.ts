/* eslint-disable @typescript-eslint/class-methods-use-this */

import ErrorPedidoYaConfirmado from "./error/errorPedidoYaConfirmado";
import EstadoListo from "./estadoListo";
import IEstadoPedido from "./iEstadoPedido";

export default class EstadoConfirmado implements IEstadoPedido {public puedeModificar(): boolean {
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
    }}