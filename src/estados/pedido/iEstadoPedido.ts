/**
 * Estado de un pedido (patron State).
 * Ciclo de vida: en construccion, confirmado, listo, facturado.
 * Cada estado decide que operaciones se permiten y a que estado se pasa.
 */
export default interface IEstadoPedido {
    /**
     * @returns true si se pueden agregar o quitar items.
     */
    puedeModificar(): boolean;
    /**
     * @returns true si el estado permite facturar el pedido.
     */
    puedeFacturarse(): boolean;
    /**
     * @returns El estado al que pasa el pedido al confirmarse.
     * @throws {Error} Si el pedido no se puede confirmar en este estado.
     */
    confirmar(): IEstadoPedido;
    /**
     * @returns El estado al que pasa el pedido al marcarse listo.
     * @throws {Error} Si el pedido no se puede marcar listo en este estado.
     */
    marcarListo(): IEstadoPedido;
    /**
     * @returns El estado al que pasa el pedido al facturarse.
     * @throws {Error} Si el pedido no se puede facturar en este estado.
     */
    marcarFacturado(): IEstadoPedido;
}