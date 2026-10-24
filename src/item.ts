import Comida from "./comida";
import Estacion from "./estacion";
import IEstadoItem from "./iEstadoItem";
import EstadoItemPendiente from "./estadoItemPendiente";


export default class Item extends Comida {

    private precio: number; 
    private estacion: Estacion; 
    private estado: IEstadoItem;

    public constructor(
        nombre:string,
        disponible:boolean,
        precio: number,
        estacion: Estacion) {
        super(nombre, disponible);
        this.precio=precio;
        this.estacion=estacion;
        this.estado=new EstadoItemPendiente();
       
    }

    public avanzarEstado(): void {
        this.estado = this.estado.siguienteEstado();
    }

    public estaListo(): boolean {
        return this.estado.estaListo();
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

