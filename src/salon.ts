import Pedido from "./pedido";
import Comida from "./comida";

export default class Salon extends Pedido {
    private mesa: string;
    private mozo: Empleado;

    constructor(numeroDePedido: string, productos: Comida[], mesa: string, mozo: Empleado){
        super(numeroDePedido,productos);
        this.mesa = mesa;
        this.mozo = mozo
    }

    


}