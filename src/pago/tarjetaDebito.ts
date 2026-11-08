/* eslint-disable @typescript-eslint/class-methods-use-this */

import IMedioPago from "./iMedioPago";

export default class TarjetaDebito implements IMedioPago {
    public getNombre(): string {
        return "Tarjeta de Debito";
    }

    public esEfectivo(): boolean {
        return false;
    }
}
