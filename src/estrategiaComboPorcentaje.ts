import { DIVISOR_CIEN } from "./constants/constant";
import IEstrategiaPrecioCombo from "./iEstrategiaPrecioCombo";

export default class EstrategiaComboPorcentaje implements IEstrategiaPrecioCombo {
    private porcentaje:number;

    public constructor(porcentaje:number) {
        this.porcentaje=porcentaje;
    }

    public calcularPrecio(precioOriginal: number): number {
        return precioOriginal - (precioOriginal * this.porcentaje / DIVISOR_CIEN);
    }
}