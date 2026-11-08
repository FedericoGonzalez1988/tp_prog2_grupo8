/* eslint-disable @typescript-eslint/class-methods-use-this */
import Comida from "./menu/comida";
import Pedido from "./pedidos/pedido";
import ItemPedido from "./pedidos/itemPedido";
import IPedidoModificable from "./pedidos/IPedidoModificable";
import { NRO_UNO } from "./constants/constant";

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

    public agregarItem(pedido: Pedido, producto: Comida, cantidad: number = NRO_UNO): void {
        pedido.agregarProducto(producto, cantidad);
    }

    public corregirItem(pedido: IPedidoModificable, item: ItemPedido): void {
        pedido.quitarHastaItem(item);
    }
}
