import { DIVISOR_CIEN, NRO_CERO } from "../constants/constant";
import IDescuento from "./iDescuento";
import IMedioPago from "./iMedioPago";

/** Descuento porcentual que aplica solo cuando se paga en efectivo. */
export default class DescuentoEfectivo implements IDescuento {
    private porcentaje: number;

    /**
     * @param porcentaje Porcentaje de descuento (por ejemplo, 10 para un 10 %).
     */
    public constructor(porcentaje: number) {
        this.porcentaje = porcentaje;
    }

    /**
     * @param total Monto sobre el que se calcula el descuento.
     * @param medioPago Medio con el que paga el cliente.
     * @returns El porcentaje del total si se paga en efectivo, o 0 si no.
     */
    public calcularDescuento(total: number, medioPago: IMedioPago): number {
        if (!medioPago.esEfectivo()) {
            return NRO_CERO;
        }
        return total * this.porcentaje / DIVISOR_CIEN;
    }
}
