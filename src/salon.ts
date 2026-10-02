import Pedido from "./pedido";
import Comida from "./comida";
import Mozo from "./mozo";

export default class Salon extends Pedido {
    private mesa: string;
    private mozo: Mozo;

    public constructor(numeroDePedido: string, productos: Comida[], mesa: string, mozo: Mozo) {
        super(numeroDePedido,productos);
        this.mesa = mesa;
        this.mozo = mozo
    }

    


}