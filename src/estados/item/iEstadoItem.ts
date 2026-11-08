
/** Estado de preparacion de un item (patron State): pendiente, en preparacion, listo. */
export default interface IEstadoItem {
    /**
     * @returns El estado siguiente (el estado listo se devuelve a si mismo).
     */
    siguienteEstado(): IEstadoItem;
    /**
     * Verifica que el item se pueda modificar o cancelar.
     * @throws {ErrorItemNoModificable} Si el item ya esta en preparacion o listo.
     */
    validarModificacion(): void;
    /**
     * @returns El nombre del estado.
     */
    getNombre(): string;
    /**
     * @returns true si el item esta listo.
     */
    estaListo(): boolean;
}