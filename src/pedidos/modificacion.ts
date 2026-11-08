import ItemPedido from "./itemPedido";

/**
 * Anotacion de un cambio hecho sobre un pedido en construccion.
 * El pedido guarda estas anotaciones para poder deshacer la ultima modificacion.
 */
export default interface Modificacion {
    /** Si el item se agrego o se quito. */
    tipo: "agregar" | "quitar";
    /** Item afectado. */
    item: ItemPedido;
    /** Posicion que tenia el item en el pedido, para volver a ponerlo en su lugar. */
    posicion: number;
}
