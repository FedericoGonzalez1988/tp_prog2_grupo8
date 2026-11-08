/* eslint-disable @typescript-eslint/class-methods-use-this */

import IMedioPago from "./iMedioPago";

/** Pago en efectivo. */
export default class Efectivo implements IMedioPago {
    public getNombre(): string {
        return "Efectivo";
    }

    public esEfectivo(): boolean {
        return true;
    }
}
