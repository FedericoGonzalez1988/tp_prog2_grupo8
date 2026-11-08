import Pedido from "./pedido";
import Comida from "../menu/comida";
import Empleado from "../empleado";

export default class PedidoDelivery extends Pedido {
    private cadete: Empleado;
    private direccion: string;
    private costoEnvio: number;

    public constructor(
        numeroPedido: string, 
        productos: Comida[] = [], 
        cadete: Empleado, 
        direccion: string, 
        costoEnvio: number) {
        super(numeroPedido, productos);
        this.cadete = cadete;
        this.direccion = direccion;
        this.costoEnvio = costoEnvio;
    }

    /** Suma el costo de envio al total. El envio nunca recibe descuentos (se descuenta sobre el subtotal). */
    public calcularTotal(): number {
        return super.calcularTotal() + this.costoEnvio;
    }

}