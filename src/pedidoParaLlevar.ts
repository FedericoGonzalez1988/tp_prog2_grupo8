import Comida from "./comida";
import Pedido from "./pedido";

export default class PedidoParaLlevar extends Pedido {

    public constructor(numeroPedido:string, productos:Comida[] = [], private horario:Date) {
        super(numeroPedido,productos);
    }

}