/* eslint-disable @typescript-eslint/class-methods-use-this */
 

import ErrorItemNoModificable from "./error/errorItemNoModificable";
import EstadoItemListo from "./estadoItemListo";
import IEstadoItem from "./iEstadoItem"

export default class EstadoItemEnPreparacion implements IEstadoItem {
    public siguienteEstado(): IEstadoItem {
        return new EstadoItemListo();
    }
    public validarModificacion(): void {
        throw new ErrorItemNoModificable("Un item en este estado no puede ser modificado");
    }
    public getNombre(): string {
        return "En Preparacion";
    }

    public estaListo(): boolean {
        return false; 
    }
    
}