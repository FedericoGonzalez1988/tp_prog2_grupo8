/** Medio con el que el cliente paga la cuenta. */
export default interface IMedioPago {
    /**
     * @returns El nombre del medio de pago.
     */
    getNombre(): string;
    /**
     * @returns true si el pago es en efectivo (habilita el descuento por efectivo).
     */
    esEfectivo(): boolean;
}
