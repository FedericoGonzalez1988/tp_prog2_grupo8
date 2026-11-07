import ItemPedido from "./itemPedido";
import Producto from "./producto";
import IEstadoItem from "./iEstadoItem";
import EstadoItemPendiente from "./estadoItemPendiente";

/**
 * Item de pedido de un producto individual. Es el que se prepara en una estacion
 * y el que guarda el estado (pendiente, en preparacion, listo).
 */
export default class ItemPedidoSimple extends ItemPedido {
    private producto: Producto;
    private estado: IEstadoItem;

    public constructor(producto: Producto, cantidad: number) {
        super(cantidad);
        this.producto = producto;
        this.estado = new EstadoItemPendiente();
    }

    public getProducto(): Producto {
        return this.producto;
    }

    public getNombreEstado(): string {
        return this.estado.getNombre();
    }

    public getSubtotal(): number {
        return this.producto.getPrecio() * this.getCantidad();
    }

    public avanzarEstado(): void {
        this.estado = this.estado.siguienteEstado();
    }

    public estaListo(): boolean {
        return this.estado.estaListo();
    }

    public validarModificacion(): void {
        this.estado.validarModificacion();
    }

    public enviarACocina(): void {
        this.producto.getEstacion().recibirItem(this);
    }
}
