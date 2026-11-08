import ItemPedido from "../pedidos/itemPedido";

/**
 * Elemento del menu que se puede pedir: un producto individual o un combo.
 * Es parte del catalogo, por eso no tiene estado de preparacion (ese estado vive en el ItemPedido).
 */
export default abstract class Comida {

    /**
     * @param nombre Nombre con el que aparece en el menu.
     * @param disponible Indica si hoy se puede pedir.
     */
    public constructor(private nombre: string, private disponible: boolean) {
        this.nombre = nombre;
        this.disponible = disponible;
    }


    /**
     * Precio de venta.
     * @returns El precio del producto, o el del combo ya con su beneficio aplicado.
     */
    public abstract getPrecio(): number;

    /**
     * Crea la linea de pedido que corresponde a esta comida (Factory Method).
     * @param cantidad Cantidad pedida.
     * @returns Un ItemPedidoSimple para un producto, o un ItemPedidoCombo para un combo.
     */
    public abstract crearItemPedido(cantidad: number): ItemPedido;

    /**
     * @param nombre Nuevo nombre.
     */
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }
    /**
     * @returns El nombre de la comida.
     */
    public getNombre(): string {
        return this.nombre;
    }

    /**
     * @param disponibilidad true si se puede pedir, false si no.
     */
    public setDisponible(disponibilidad:boolean): void {
        this.disponible = disponibilidad;
    }

    /**
     * @returns true si la comida se puede pedir.
     */
    public getDisponible(): boolean {
        return this.disponible;
    }

}
