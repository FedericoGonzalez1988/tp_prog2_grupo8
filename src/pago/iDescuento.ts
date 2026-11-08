import IMedioPago from "./iMedioPago";

/**
 * Descuento sobre el total del pedido (patron Strategy).
 * Para agregar un descuento nuevo alcanza con crear otra clase que lo implemente.
 */
export default interface IDescuento {
    /**
     * @param total Monto sobre el que se calcula el descuento.
     * @param medioPago Medio con el que paga el cliente.
     * @returns El monto a descontar, o 0 si el descuento no aplica.
     */
    calcularDescuento(total: number, medioPago: IMedioPago): number;
}
