/* eslint-disable @typescript-eslint/class-methods-use-this */

import IMedioPago from "./iMedioPago";

export default class BilleteraVirtual implements IMedioPago {
    public getNombre(): string {
        return "Billetera Virtual";
    }

    public esEfectivo(): boolean {
        return false;
    }
}
