/* eslint-disable @typescript-eslint/class-methods-use-this */
 

import ErrorItemNoModificable from "./error/errorItemNoModificable";
import IEstadoItem from "./iEstadoItem";

export default class EstadoItemListo implements IEstadoItem {
    public siguienteEstado(): IEstadoItem {
        return this;
    }

    public validarModificacion(): void {
        throw new ErrorItemNoModificable("Un item en este estado no puede ser modificado");
    }

    public getNombre(): string {
        return "Listo";
    }

    public estaListo(): boolean {
        return true; 
    }

}