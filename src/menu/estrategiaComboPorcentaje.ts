import { DIVISOR_CIEN } from "../constants/constant";
import IEstrategiaPrecioCombo from "./iEstrategiaPrecioCombo";

/** Beneficio de combo: descuento porcentual sobre la suma de sus productos. */
export default class EstrategiaComboPorcentaje implements IEstrategiaPrecioCombo {
    private porcentaje:number;

    /**
     * @param porcentaje Porcentaje de descuento (por ejemplo, 10 para un 10 %).
     */
    public constructor(porcentaje:number) {
        this.porcentaje=porcentaje;
    }

    public calcularPrecio(precioOriginal: number): number {
        return precioOriginal - (precioOriginal * this.porcentaje / DIVISOR_CIEN);
    }
}