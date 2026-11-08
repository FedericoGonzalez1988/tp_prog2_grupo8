import ItemPedido from "./itemPedido";

/**
 * Anotacion de un cambio hecho sobre un pedido en construccion.
 * El pedido guarda estas anotaciones para poder deshacer la ultima modificacion.
 */
export default interface Modificacion {
    tipo: "agregar" | "quitar";
    item: ItemPedido;
    posicion: number;
}
