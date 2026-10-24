/* eslint-disable @typescript-eslint/class-methods-use-this */
import Comida from "./comida";
import Pedido from "./pedido";
import IPedidoModificable from "./IPedidoModificable";

export default class Empleado {
    public constructor(
        private nombre: string,
        private cuil : string,
        private sector: string
    ) {}
    public getNombre(): string {
        return this.nombre
    }
    public getCuil(): string {
        return this.cuil
    }
    public getSector(): string {
        return this.sector
    }

    public agregarItem(pedido: Pedido, item: Comida): void {
        pedido.agregarProducto(item);
    }

    public corregirItem(pedido: IPedidoModificable, item: Comida): void {
        pedido.quitarHastaItem(item);
    }
}
