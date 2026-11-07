import Pedido from "./pedido";
import Comida from "./comida";
import Empleado from "./empleado";
import ItemPedido from "./itemPedido";
import IPedidoModificable from "./IPedidoModificable";

export default class PedidoSalon extends Pedido implements IPedidoModificable {
    private mesa: string;
    private mozo: Empleado;

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
