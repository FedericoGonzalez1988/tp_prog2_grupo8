/* eslint-disable @typescript-eslint/class-methods-use-this */
import Comida from "./menu/comida";
import Pedido from "./pedidos/pedido";
import ItemPedido from "./pedidos/itemPedido";
import IPedidoModificable from "./pedidos/IPedidoModificable";
import { NRO_UNO } from "./constants/constant";

/** Empleado del restaurante (por ejemplo, un mozo o un cadete). */
export default class Empleado {
    /**
     * @param nombre Nombre del empleado.
     * @param cuil CUIL del empleado.
     * @param sector Sector en el que trabaja.
     */
    public constructor(
        private nombre: string,
        private cuil : string,
        private sector: string
    ) {}
    /**
     * @returns El nombre del empleado.
     */
    public getNombre(): string {
        return this.nombre
    }
    /**
     * @returns El CUIL del empleado.
     */
    public getCuil(): string {
        return this.cuil
    }
    /**
     * @returns El sector en el que trabaja.
     */
    public getSector(): string {
        return this.sector
    }

    /**
     * Carga un producto o combo en el pedido.
     * @param pedido Pedido en construccion.
     * @param producto Comida a agregar.
     * @param cantidad Cantidad pedida (1 por defecto).
     */
    public agregarItem(pedido: Pedido, producto: Comida, cantidad: number = NRO_UNO): void {
        pedido.agregarProducto(producto, cantidad);
    }

    /**
     * Borra lo cargado en el pedido hasta el item a corregir.
     * @param pedido Pedido que admite correcciones.
     * @param item Item a corregir.
     */
    public corregirItem(pedido: IPedidoModificable, item: ItemPedido): void {
        pedido.quitarHastaItem(item);
    }
}
