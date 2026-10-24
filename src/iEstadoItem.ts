
export default interface IEstadoItem {
    siguienteEstado(): IEstadoItem;
    validarModificacion(): void;
    getNombre(): string;
    estaListo(): boolean;
}