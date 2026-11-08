import Comida from "../menu/comida";
import Pedido from "./pedido";
import ItemPedido from "./itemPedido";
import IPedidoModificable from "./IPedidoModificable";

export default class PedidoParaLlevar extends Pedido implements IPedidoModificable {

    public constructor(numeroPedido:string, productos:Comida[] = [], private horario:Date) {
        super(numeroPedido,productos);
    }

    public deshacerUltimoItem(): ItemPedido | null {
        return this.deshacerUltimo();
    }

    public quitarHastaItem(item: ItemPedido): void {
        this.quitarHasta(item);
    }

}
