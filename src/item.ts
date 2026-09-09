export default class Item {

    // hay que cambiar el tipo de variable del estado. No me acuerdo en qué quedamos.
    constructor(private nombre: string, private estacion: Estacion, private estado: string, private precio: number, private disponible: boolean = true) {

        this.nombre = nombre;
        this.estacion = estacion;
        this.estado = estado;
        this.precio = precio;

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