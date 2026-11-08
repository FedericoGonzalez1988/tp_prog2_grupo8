import Pedido from "./pedido";
import Comida from "../menu/comida";
import Empleado from "../empleado";
import ItemPedido from "./itemPedido";
import IPedidoModificable from "./IPedidoModificable";

/**
 * Pedido tomado en el salon: tiene una mesa y un mozo asignados.
 * Se puede corregir antes de confirmar (IPedidoModificable).
 */
export default class PedidoSalon extends Pedido implements IPedidoModificable {
    private mesa: string;
    private mozo: Empleado;

    /**
     * @param numeroDePedido Identificador del pedido.
     * @param productos Productos con los que arranca el pedido.
     * @param mesa Mesa del cliente.
     * @param mozo Mozo que toma el pedido.
     */
    public constructor(numeroDePedido: string, productos: Comida[], mesa: string, mozo: Empleado) {
        super(numeroDePedido,productos);
        this.mesa = mesa;
        this.mozo = mozo
    }

    public deshacerUltimoItem(): ItemPedido | null {
        return this.deshacerUltimo();
    }

    public quitarHastaItem(item: ItemPedido): void {
        this.quitarHasta(item);
    }

}
