import Estado from "./estado";
import Estacion from "./estacion";


export default class Comida {

    constructor(private nombre: string, private precio: number, private estacion: Estacion, private disponible: boolean = true, private estado: Estado ) {
        this.nombre = nombre;
        this.precio = precio;
        this.estacion = estacion;
        this.estado = estado;
    }

    
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

    public setEstacion(estacion: Estacion): void {
        this.estacion = estacion;
    }

    public getEstacion(): Estacion {
        return this.estacion;
    }

    public setDisponible(disponibilidad:boolean): void {
        this.disponible = disponibilidad;
    }

    public getDisponible(): boolean {
        return this.disponible;
    }
}