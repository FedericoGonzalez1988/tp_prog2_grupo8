/** Renglon de una factura: copia lo que se cobro por un item del pedido. */
export default class LineaFactura {
    private descripcion: string;
    private cantidad: number;
    private importe: number;

    /**
     * @param descripcion Nombre del producto o combo.
     * @param cantidad Cantidad cobrada.
     * @param importe Importe cobrado por la linea.
     */
    public constructor(descripcion: string, cantidad: number, importe: number) {
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.importe = importe;
    }

    /**
     * @returns El nombre del producto o combo.
     */
    public getDescripcion(): string {
        return this.descripcion;
    }

    /**
     * @returns La cantidad cobrada.
     */
    public getCantidad(): number {
        return this.cantidad;
    }

    /**
     * @returns El importe cobrado por la linea.
     */
    public getImporte(): number {
        return this.importe;
    }
}
