/* eslint-disable @typescript-eslint/class-methods-use-this */
/* eslint-disable @typescript-eslint/no-empty-function */

import IEstadoItem from "./iEstadoItem"
import EstadoItemEnPreparacion from "./estadoItemEnPreparacion";

export default class EstadoItemPendiente implements IEstadoItem {
    
    
    public siguienteEstado(): IEstadoItem {
        return new EstadoItemEnPreparacion();
    }

     
    public validarModificacion(): void {
    
    }

     
    public getNombre(): string {
        return "Pendiente";
    }

    public estaListo(): boolean {
        return false; 
    }
    
}