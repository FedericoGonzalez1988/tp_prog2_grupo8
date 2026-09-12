import Comida from "./comida";
import Estacion from "./estacion";
import Estado from "./estado";


export default class Item extends Comida{

    constructor(nombre: string, disponible: boolean, private precio: number, private estacion: Estacion, private estado:Estado) {
        super(nombre, disponible);
        this.precio = precio;
        this.estacion = estacion;
        this.estado = estado;
    }
     
    //este metodo chequearEstado deberá ser revisado cuando definamos la clase Estado
    chequearEstado():Estado {
        return this.estado;
    }

    public setPrecio(precio: number): void {
        this.precio = precio;
    }

    public getPrecio(): number {
        return this.precio;
    }
    
    public setEstacion(estacion: Estacion): void {
        this.estacion = estacion;
    }

    public getEstacion(): Estacion {
        return this.estacion;
    }

}

