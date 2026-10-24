export default interface IEstadoPedido {
    puedeModificar(): boolean;
    puedeFacturarse(): boolean;
    confirmar(): IEstadoPedido;
    marcarListo(): IEstadoPedido;
}