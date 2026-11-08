import IMedioPago from "./iMedioPago";
import LineaFactura from "./lineaFactura";
import Pedido from "./pedido";

/**
 * Comprobante de un pedido cobrado. Es una foto del momento del cobro: copia
 * descripciones, cantidades e importes, asi el historial no cambia si despues
 * se modifican los precios del menu.
 */
export default class Factura {
    private numeroPedido: string;
    private fecha: Date;
    private medioPago: IMedioPago;
    private lineas: LineaFactura[];
    private subtotal: number;
    private cargosExtra: number;
    private descuento: number;

    public constructor(pedido: Pedido, medioPago: IMedioPago, descuento: number) {
        this.numeroPedido = pedido.getNumeroPedido();
        this.fecha = new Date();
        this.medioPago = medioPago;
        this.lineas = pedido.getItems().map(item =>
            new LineaFactura(item.getDescripcion(), item.getCantidad(), item.getSubtotal()));
        this.subtotal = pedido.calcularSubtotal();
        this.cargosExtra = pedido.calcularTotal() - this.subtotal;
        this.descuento = descuento;
    }

    public getNumeroPedido(): string {
        return this.numeroPedido;
    }

    public getFecha(): Date {
        return new Date(this.fecha);
    }

    public getMedioPago(): IMedioPago {
        return this.medioPago;
    }

    public getLineas(): LineaFactura[] {
        return [...this.lineas];
    }

    /** Suma de los items (base sobre la que se calcula el descuento). */
    public getSubtotal(): number {
        return this.subtotal;
    }

    /** Cargos que no reciben descuento, como el costo de envio. 0 si no hay. */
    public getCargosExtra(): number {
        return this.cargosExtra;
    }

    public getDescuento(): number {
        return this.descuento;
    }

    /** Lo que se le cobro al cliente: subtotal + cargos extra - descuento. */
    public getTotal(): number {
        return this.subtotal + this.cargosExtra - this.descuento;
    }
}
