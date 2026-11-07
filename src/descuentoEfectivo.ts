import { DIVISOR_CIEN, NRO_CERO } from "./constants/constant";
import IDescuento from "./iDescuento";
import IMedioPago from "./iMedioPago";

/** Descuento porcentual que aplica solo cuando se paga en efectivo. */
export default class DescuentoEfectivo implements IDescuento {
    private porcentaje: number;

    public constructor(porcentaje: number) {
        this.porcentaje = porcentaje;
    }

    public calcularDescuento(total: number, medioPago: IMedioPago): number {
        if (!medioPago.esEfectivo()) {
            return NRO_CERO;
        }
        return total * this.porcentaje / DIVISOR_CIEN;
    }
}
