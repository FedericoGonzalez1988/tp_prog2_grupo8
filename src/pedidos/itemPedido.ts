/**
 * Linea de un pedido: una comida del menu pedida en cierta cantidad.
 * A diferencia de la Comida (catalogo), el item del pedido tiene estado de preparacion.
 * Es la base del patron Composite: puede ser un item simple o un combo con componentes.
 */
export default abstract class ItemPedido {

    /**
     * @param cantidad Cantidad pedida.
     */
    public constructor(private cantidad: number) {}

    /**
     * @returns La cantidad pedida.
     */
    public getCantidad(): number {
        return this.cantidad;
    }

    /**
     * @returns El texto con el que el item aparece en la factura (nombre del producto o del combo).
     */
    public abstract getDescripcion(): string;

    /**
     * @returns El precio por la cantidad.
     */
    public abstract getSubtotal(): number;

    /**
     * @returns true si el item (o todos sus componentes) esta listo.
     */
    public abstract estaListo(): boolean;

    /**
     * Verifica que el item todavia se pueda modificar o cancelar.
     * @throws {ErrorItemNoModificable} Si el item ya esta en preparacion o listo.
     */
    public abstract validarModificacion(): void;

    /** Envia el item (o sus componentes) a la estacion de cocina que corresponda. */
    public abstract enviarACocina(): void;
}
