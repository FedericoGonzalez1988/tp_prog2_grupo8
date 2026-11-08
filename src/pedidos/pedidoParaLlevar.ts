import Comida from "../menu/comida";
import Pedido from "./pedido";
import ItemPedido from "./itemPedido";
import IPedidoModificable from "./IPedidoModificable";

/**
 * Pedido para retirar: el cliente lo encarga y pasa a buscarlo en un horario acordado.
 * Se puede corregir antes de confirmar (IPedidoModificable).
 */
export default class PedidoParaLlevar extends Pedido implements IPedidoModificable {

    /**
     * @param numeroPedido Identificador del pedido.
     * @param productos Productos con los que arranca el pedido.
     * @param horario Horario de retiro acordado.
     */
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
