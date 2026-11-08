import Cola from "./cola";
import ItemPedidoSimple from "../pedidos/itemPedidoSimple";

export default abstract class Estacion {
    private nombreEstacion: string;
    private itemsEstacion: Cola<ItemPedidoSimple>;

    public constructor(nombreEstacion: string) {
        this.nombreEstacion = nombreEstacion;
        this.itemsEstacion=new Cola<ItemPedidoSimple>();
    }

    public getNombreEstacion(): string {
        return this.nombreEstacion;
    }

    public setNombreEstacion(nombreEstacion: string): void {
        this.nombreEstacion = nombreEstacion;
    }

    public recibirItem(item: ItemPedidoSimple): void {
        this.itemsEstacion.encolar(item);
    }

    /**
     * Toma el siguiente item en orden de llegada y lo pasa a "en preparacion".
     * Devuelve el item para que el cocinero lo marque como listo al terminarlo.
     * Si la cola esta vacia devuelve undefined.
     */
    public procesarSiguiente(): ItemPedidoSimple | undefined {
        const itemActual = this.itemsEstacion.desencolar();
        if (itemActual) {
            itemActual.avanzarEstado();
        }
        return itemActual;
    }

}
