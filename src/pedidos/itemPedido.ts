/**
 * Linea de un pedido: una Comida del menu pedida en cierta cantidad.
 * A diferencia de la Comida (catalogo), el ItemPedido tiene estado de preparacion.
 */
export default abstract class ItemPedido {

    public constructor(private cantidad: number) {}

    public getCantidad(): number {
        return this.cantidad;
    }

    /** Texto con el que el item aparece en la factura (nombre del producto o del combo). */
    public abstract getDescripcion(): string;

    public abstract getSubtotal(): number;

    public abstract estaListo(): boolean;

    /** Lanza ErrorItemNoModificable si el item ya no puede modificarse ni cancelarse. */
    public abstract validarModificacion(): void;

    /** Envia el item (o sus componentes) a la estacion de cocina que corresponda. */
    public abstract enviarACocina(): void;
}
