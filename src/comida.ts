export default abstract class Comida {

    public constructor(private nombre: string, private disponible: boolean) {
        this.nombre = nombre;
        this.disponible = disponible;
    }
 

    public abstract getPrecio(): number;

    public abstract estaListo(): boolean;

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