import ItemPedido from "./itemPedido";
import Producto from "../menu/producto";
import IEstadoItem from "../estados/item/iEstadoItem";
import EstadoItemPendiente from "../estados/item/estadoItemPendiente";

/**
 * Item de pedido de un producto individual. Es el que se prepara en una estacion
 * y el que guarda el estado (pendiente, en preparacion, listo).
 */
export default class ItemPedidoSimple extends ItemPedido {
    private producto: Producto;
    private estado: IEstadoItem;

    /**
     * El item empieza en estado pendiente.
     * @param producto Producto pedido.
     * @param cantidad Cantidad pedida.
     */
    public constructor(producto: Producto, cantidad: number) {
        super(cantidad);
        this.producto = producto;
        this.estado = new EstadoItemPendiente();
    }

    /**
     * @returns El producto pedido.
     */
    public getProducto(): Producto {
        return this.producto;
    }

    /**
     * @returns El nombre del producto.
     */
    public getDescripcion(): string {
        return this.producto.getNombre();
    }

    /**
     * @returns El nombre del estado actual ("Pendiente", "En Preparacion" o "Listo").
     */
    public getNombreEstado(): string {
        return this.estado.getNombre();
    }

    /**
     * @returns El precio del producto por la cantidad.
     */
    public getSubtotal(): number {
        return this.producto.getPrecio() * this.getCantidad();
    }

    /** Pasa al siguiente estado: pendiente, en preparacion, listo. */
    public avanzarEstado(): void {
        this.estado = this.estado.siguienteEstado();
    }

    /**
     * @returns true si el item esta listo.
     */
    public estaListo(): boolean {
        return this.estado.estaListo();
    }

    /**
     * @throws {ErrorItemNoModificable} Si el item ya esta en preparacion o listo.
     */
    public validarModificacion(): void {
        this.estado.validarModificacion();
    }

    /** Encola el item en la estacion que prepara su producto. */
    public enviarACocina(): void {
        this.producto.getEstacion().recibirItem(this);
    }
}
