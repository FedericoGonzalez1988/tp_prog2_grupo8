/* eslint-disable @typescript-eslint/class-methods-use-this */

import IEstadoPedido from "./iEstadoPedido";

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
}