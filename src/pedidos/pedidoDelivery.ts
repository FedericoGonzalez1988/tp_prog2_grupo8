import Pedido from "./pedido";
import Comida from "../menu/comida";
import Empleado from "../empleado";

/** Pedido con envio a domicilio por un cadete propio del restaurante. */
export default class PedidoDelivery extends Pedido {
    private cadete: Empleado;
    private direccion: string;
    private costoEnvio: number;

    /**
     * @param numeroPedido Identificador del pedido.
     * @param productos Productos con los que arranca el pedido.
     * @param cadete Cadete que hace la entrega.
     * @param direccion Direccion de entrega.
     * @param costoEnvio Costo del envio, que nunca recibe descuentos.
     */
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

    /**
     * Suma el costo de envio al subtotal. El envio nunca recibe descuentos,
     * porque la Caja los calcula sobre el subtotal.
     * @returns El subtotal mas el costo de envio.
     */
    public calcularTotal(): number {
        return super.calcularTotal() + this.costoEnvio;
    }

}