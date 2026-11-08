import ErrorPrecioFijoComboIncorrecto from "../error/errorPrecioFijoComboIncorrecto";
import IEstrategiaPrecioCombo from "./iEstrategiaPrecioCombo";

/** Beneficio de combo: precio fijo cerrado, menor a la suma de sus productos. */
export default class EstrategiaComboPrecioFijo implements IEstrategiaPrecioCombo {
    private precioFijo:number;

    /**
     * @param precioFijo Precio final del combo.
     */
    public constructor(precioFijo:number) {
        this.precioFijo=precioFijo;
    }

    /**
     * @param precioOriginal Suma de los precios de los productos del combo.
     * @returns El precio fijo.
     * @throws {ErrorPrecioFijoComboIncorrecto} Si el precio fijo no es menor a la suma de los productos.
     */
    public calcularPrecio(precioOriginal: number): number {
        if (precioOriginal<= this.precioFijo) {
            throw new ErrorPrecioFijoComboIncorrecto("El precio fijo asignado al combo supera al sumado por cada item");
        }
        return this.precioFijo;
    }


}