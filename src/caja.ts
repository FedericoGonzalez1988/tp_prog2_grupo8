import { NRO_CERO } from "./constants/constant";
import IDescuento from "./iDescuento";
import IMedioPago from "./iMedioPago";
import Pedido from "./pedido";

/** Calcula lo que se le cobra al cliente segun el medio de pago y los descuentos vigentes. */
export default class Caja {
    private descuentos: IDescuento[];

    public constructor(descuentos: IDescuento[] = []) {
        this.descuentos = descuentos;
    }

    /**
     * Total a cobrar: el total del pedido menos el descuento mas beneficioso.
     * El descuento se calcula sobre el subtotal (productos), asi los cargos extra
     * como el costo de envio nunca reciben descuento.
     */
    public calcularTotalACobrar(pedido: Pedido, medioPago: IMedioPago): number {
        const descuento = this.calcularMejorDescuento(pedido.calcularSubtotal(), medioPago);
        return pedido.calcularTotal() - descuento;
    }

    /** El mayor de los descuentos que aplican (nunca se combinan), o 0 si no aplica ninguno. */
    private calcularMejorDescuento(total: number, medioPago: IMedioPago): number {
        const montos = this.descuentos.map(descuento => descuento.calcularDescuento(total, medioPago));
        return Math.max(NRO_CERO, ...montos);
    }
}
