import Cola from "./cola";
import ItemPedidoSimple from "../pedidos/itemPedidoSimple";

/**
 * Estacion de cocina que prepara items en el orden en que le llegan (usa una Cola).
 * Para agregar una estacion nueva alcanza con crear otra subclase.
 */
export default abstract class Estacion {
    private nombreEstacion: string;
    private itemsEstacion: Cola<ItemPedidoSimple>;

    /**
     * @param nombreEstacion Nombre de la estacion.
     */
    public constructor(nombreEstacion: string) {
        this.nombreEstacion = nombreEstacion;
        this.itemsEstacion=new Cola<ItemPedidoSimple>();
    }

    /**
     * @returns El nombre de la estacion.
     */
    public getNombreEstacion(): string {
        return this.nombreEstacion;
    }

    /**
     * @param nombreEstacion Nuevo nombre de la estacion.
     */
    public setNombreEstacion(nombreEstacion: string): void {
        this.nombreEstacion = nombreEstacion;
    }

    /**
     * Encola un item para prepararlo.
     * @param item Item que llega a la estacion.
     */
    public recibirItem(item: ItemPedidoSimple): void {
        this.itemsEstacion.encolar(item);
    }

    /**
     * Toma el siguiente item en orden de llegada y lo pasa a "en preparacion".
     * El cocinero lo marca como listo al terminarlo, con avanzarEstado().
     * @returns El item tomado, o undefined si la cola esta vacia.
     */
    public procesarSiguiente(): ItemPedidoSimple | undefined {
        const itemActual = this.itemsEstacion.desencolar();
        if (itemActual) {
            itemActual.avanzarEstado();
        }
        return itemActual;
    }

}
