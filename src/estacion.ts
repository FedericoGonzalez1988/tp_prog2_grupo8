import Cola from "./cola";
import Item from "./item";

export default abstract class Estacion {
    private nombreEstacion: string;
    private itemsEstacion: Cola<Item>;

    public constructor(nombreEstacion: string) {
        this.nombreEstacion = nombreEstacion;
        this.itemsEstacion=new Cola<Item>();
    }

    public getNombreEstacion(): string {
        return this.nombreEstacion;
    }

    public setNombreEstacion(nombreEstacion: string): void {
        this.nombreEstacion = nombreEstacion;
    }

    public recibirItem(item: Item): void {
        this.itemsEstacion.encolar(item);
    }

    public procesarSiguiente(): void {
        if (!this.itemsEstacion.estaVacia()) {
            const itemActual = this.itemsEstacion.desencolar();
            
            if (itemActual) {
                // La estación dispara la acción, el ítem y su estado resuelven cómo hacerlo
                itemActual.avanzarSiguienteEstado();
            }
        }
    }

}