import ItemPedido from "./itemPedido"

export default interface IPedidoModificable {
    deshacerUltimoItem(): ItemPedido | null;
    quitarHastaItem(item: ItemPedido): void;
}
