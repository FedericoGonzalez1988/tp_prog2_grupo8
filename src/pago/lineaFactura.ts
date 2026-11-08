/** Renglon de una factura: copia lo que se cobro por un item del pedido. */
export default class LineaFactura {
    private descripcion: string;
    private cantidad: number;
    private importe: number;

    public constructor(descripcion: string, cantidad: number, importe: number) {
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.importe = importe;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public getCantidad(): number {
        return this.cantidad;
    }

    public getImporte(): number {
        return this.importe;
    }
}
