import Estado from "./estado";
import Estacion from "./estacion";


export default abstract class Comida {

    constructor(private nombre: string, private disponible: boolean) {
        this.nombre = nombre;
        this.disponible = disponible;
    }

    public abstract chequearEstado(): Estado 

    public abstract getPrecio(): number;

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }
    public getNombre(): string {
        return this.nombre;
    }

    public setDisponible(disponibilidad:boolean): void {
        this.disponible = disponibilidad;
    }

    public getDisponible(): boolean {
        return this.disponible;
    }

}