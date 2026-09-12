import Estado from "./estado";
import Estacion from "./estacion";


export default abstract class Comida {

    constructor(private nombre: string, private precio: number, private disponible: boolean = true) {
        this.nombre = nombre;
        this.precio = precio;
        this.disponible = disponible;

    }

    abstract chequearEstado(): Estado 

    public setPrecio(precio: number): void {
        this.precio = precio;
    }
    public getPrecio(): number {
        return this.precio;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }
    public getNombre(): string {
        return this.nombre;
    }

}