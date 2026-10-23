import ErrorPrecioFijoComboIncorrecto from "./error/errorPrecioFijoComboIncorrecto";
import IEstrategiaPrecioCombo from "./iEstrategiaPrecioCombo";

export default class EstrategiaComboPrecioFijo implements IEstrategiaPrecioCombo {
    private precioFijo:number;

    public constructor(precioFijo:number) {
        this.precioFijo=precioFijo;
    }

    public calcularPrecio(precioOriginal: number): number {
        if (precioOriginal<= this.precioFijo) {
            throw new ErrorPrecioFijoComboIncorrecto("El precio fijo asignado al combo supera al sumado por cada item");
        }
        return this.precioFijo;
    }


}