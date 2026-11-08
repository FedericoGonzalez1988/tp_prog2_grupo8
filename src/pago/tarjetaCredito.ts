/* eslint-disable @typescript-eslint/class-methods-use-this */

import IMedioPago from "./iMedioPago";

/** Pago con tarjeta de credito. */
export default class TarjetaCredito implements IMedioPago {
    public getNombre(): string {
        return "Tarjeta de Credito";
    }

    public esEfectivo(): boolean {
        return false;
    }
}
