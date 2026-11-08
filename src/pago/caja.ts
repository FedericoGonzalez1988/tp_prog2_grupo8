import { NRO_CERO } from "../constants/constant";
import ErrorPedidoNoFacturable from "../error/errorPedidoNoFacturable";
import Factura from "./factura";
import IDescuento from "./iDescuento";
import IMedioPago from "./iMedioPago";
import Pedido from "../pedidos/pedido";

/** Cobra los pedidos segun el medio de pago y los descuentos vigentes, y guarda el historial. */
export default class Caja {
    private descuentos: IDescuento[];
    private historial: Factura[];

    public constructor(descuentos: IDescuento[] = []) {
        this.descuentos = descuentos;
        this.historial = [];
    }

    /**
     * Total a cobrar: el total del pedido menos el descuento mas beneficioso.
     * El descuento se calcula sobre el subtotal (productos), asi los cargos extra
     * como el costo de envio nunca reciben descuento.
     */
    public calcularTotalACobrar(pedido: Pedido, medioPago: IMedioPago): number {
        return pedido.calcularTotal() - this.calcularDescuento(pedido, medioPago);
    }

    /**
     * Cobra el pedido: genera la factura, pasa el pedido a facturado y lo agrega al historial.
     * Lanza ErrorPedidoNoFacturable si el pedido no esta listo o alguno de sus items no lo esta.
     */
    public facturar(pedido: Pedido, medioPago: IMedioPago): Factura {
        if (!pedido.puedeFacturarse()) {
            throw new ErrorPedidoNoFacturable("El pedido no puede facturarse hasta que todos sus items esten listos.");
        }
        const factura = new Factura(pedido, medioPago, this.calcularDescuento(pedido, medioPago));
        pedido.marcarFacturado();
        this.historial.push(factura);
        return factura;
    }

    /** Facturas de los pedidos finalizados, en el orden en que se cobraron. */
    public getHistorial(): Factura[] {
        return [...this.historial];
    }

    private calcularDescuento(pedido: Pedido, medioPago: IMedioPago): number {
        return this.calcularMejorDescuento(pedido.calcularSubtotal(), medioPago);
    }

    /** El mayor de los descuentos que aplican (nunca se combinan), o 0 si no aplica ninguno. */
    private calcularMejorDescuento(total: number, medioPago: IMedioPago): number {
        const montos = this.descuentos.map(descuento => descuento.calcularDescuento(total, medioPago));
        return Math.max(NRO_CERO, ...montos);
    }
}
