/**
 * Forma de calcular el precio especial de un combo (patron Strategy).
 * Permite crear combos nuevos con otros tipos de beneficio sin modificar la clase Combo.
 */
export default interface IEstrategiaPrecioCombo {
    /**
     * @param precioOriginal Suma de los precios de los productos del combo.
     * @returns El precio del combo con el beneficio aplicado.
     */
    calcularPrecio(precioOriginal: number): number;
}