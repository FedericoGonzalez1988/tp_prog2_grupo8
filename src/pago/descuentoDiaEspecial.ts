import { DIVISOR_CIEN, NRO_CERO } from "../constants/constant";
import DiaSemana from "./diaSemana";
import IDescuento from "./iDescuento";

/** Descuento porcentual que aplica un dia determinado de la semana, con cualquier medio de pago. */
export default class DescuentoDiaEspecial implements IDescuento {
    private diaSemana: DiaSemana;
    private porcentaje: number;

    /**
     * @param diaSemana Dia en que aplica el descuento.
     * @param porcentaje Porcentaje de descuento (por ejemplo, 15 para un 15 %).
     */
    public constructor(diaSemana: DiaSemana, porcentaje: number) {
        this.diaSemana = diaSemana;
        this.porcentaje = porcentaje;
    }

    /**
     * No depende del medio de pago, por eso no recibe ese parametro de IDescuento.
     * @param total Monto sobre el que se calcula el descuento.
     * @returns El porcentaje del total si hoy es el dia especial, o 0 si no.
     */
    public calcularDescuento(total: number): number {
        if (new Date().getDay() !== this.diaSemana) {
            return NRO_CERO;
        }
        return total * this.porcentaje / DIVISOR_CIEN;
    }
}
