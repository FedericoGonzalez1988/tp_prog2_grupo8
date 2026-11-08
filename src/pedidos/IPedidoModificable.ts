import ItemPedido from "./itemPedido"

/** Pedido que se puede corregir mientras esta en construccion (salon y para llevar). */
export default interface IPedidoModificable {
    /**
     * Deshace la ultima modificacion realizada sobre el pedido.
     * @returns El item afectado, o null si no hay nada para deshacer.
     */
    deshacerUltimoItem(): ItemPedido | null;
    /**
     * Borra lo cargado desde el ultimo item hasta el indicado (inclusive).
     * @param item Item hasta el que se borra.
     */
    quitarHastaItem(item: ItemPedido): void;
}
