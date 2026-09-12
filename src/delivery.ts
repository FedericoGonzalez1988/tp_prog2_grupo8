import Pedido from "./pedido";
import Comida from "./comida";

export default class Delivery extends Pedido {
    private cadete: Empleado;
    private direccion: string;
    private costoEnvio: number;

    public constructor(numeroPedido: string, productos: Comida[] = [], cadete: Empleado, direccion: string, costoEnvio: number){
        super(numeroPedido, productos);
        this.cadete = cadete;
        this.direccion = direccion;
        this.costoEnvio = costoEnvio;
    }

}