import IMedioPago from "./iMedioPago";

export default interface IDescuento {
    /** Devuelve el monto a descontar sobre el total, o 0 si el descuento no aplica. */
    calcularDescuento(total: number, medioPago: IMedioPago): number;
}
