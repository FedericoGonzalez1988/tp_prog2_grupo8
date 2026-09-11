import Comida from "./comida";
import Estacion from "./estacion";
import Estado from "./estado";


export default class Item extends Comida{

    constructor(nombre: string, precio: number, disponible: boolean, private estacion: Estacion, private estado:Estado) {

        super(nombre, precio, disponible);
        this.estacion = estacion;
        this.estado = estado;

    }
        
    chequearEstado() {
        return this.estado;
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

