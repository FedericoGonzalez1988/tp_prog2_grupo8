import Pedido from "./pedido";
import Comida from "./comida";
import Empleado from "./empleado";

export default class PedidoSalon extends Pedido {
    private mesa: string;
    private mozo: Empleado;

    public constructor(numeroDePedido: string, productos: Comida[], mesa: string, mozo: Empleado) {
        super(numeroDePedido,productos);
        this.mesa = mesa;
        this.mozo = mozo
    }

    


}