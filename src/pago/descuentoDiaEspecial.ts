import { DIVISOR_CIEN, NRO_CERO } from "../constants/constant";
import DiaSemana from "./diaSemana";
import IDescuento from "./iDescuento";

/** Descuento porcentual que aplica un dia determinado de la semana, con cualquier medio de pago. */
export default class DescuentoDiaEspecial implements IDescuento {
    private diaSemana: DiaSemana;
    private porcentaje: number;

    public constructor(diaSemana: DiaSemana, porcentaje: number) {
        this.diaSemana = diaSemana;
        this.porcentaje = porcentaje;
    }

    /** No depende del medio de pago, por eso no recibe ese parametro de IDescuento. */
    public calcularDescuento(total: number): number {
        if (new Date().getDay() !== this.diaSemana) {
            return NRO_CERO;
        }
        return total * this.porcentaje / DIVISOR_CIEN;
    }
}
