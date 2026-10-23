import Item from "./item";

export default abstract class Estacion {
    private nombreEstacion: string;

    public constructor(nombreEstacion: string) {
        this.nombreEstacion = nombreEstacion;
    }

    public getNombreEstacion(): string {
        return this.nombreEstacion;
    }

    public setNombreEstacion(nombreEstacion: string): void {
        this.nombreEstacion = nombreEstacion;
    }

    public abstract modificarEstadoItem(itemModificar: Item): void;


}