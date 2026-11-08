import { NRO_CERO } from "../constants/constant";
import ErrorPedidoNoFacturable from "../error/errorPedidoNoFacturable";
import Factura from "./factura";
import IDescuento from "./iDescuento";
import IMedioPago from "./iMedioPago";
import Pedido from "../pedidos/pedido";

/** Cobra los pedidos segun el medio de pago y los descuentos vigentes, y guarda el historial de facturas. */
export default class Caja {
    private descuentos: IDescuento[];
    private historial: Factura[];

    /**
     * @param descuentos Descuentos que ofrece el restaurante (ninguno por defecto).
     */
    public constructor(descuentos: IDescuento[] = []) {
        this.descuentos = descuentos;
        this.historial = [];
    }

    /**
     * Total a cobrar: el total del pedido menos el descuento mas beneficioso.
     * El descuento se calcula sobre el subtotal (productos), asi los cargos extra
     * como el costo de envio nunca reciben descuento.
     * @param pedido Pedido a cobrar.
     * @param medioPago Medio con el que paga el cliente.
     * @returns El importe a cobrar.
     */
    public calcularTotalACobrar(pedido: Pedido, medioPago: IMedioPago): number {
        return pedido.calcularTotal() - this.calcularDescuento(pedido, medioPago);
    }

    /**
     * Cobra el pedido: genera la factura, pasa el pedido a facturado y lo agrega al historial.
     * @param pedido Pedido a cobrar; debe estar listo y con todos sus items listos.
     * @param medioPago Medio con el que paga el cliente.
     * @returns La factura con el detalle de lo cobrado.
     * @throws {ErrorPedidoNoFacturable} Si el pedido o alguno de sus items no esta listo.
     */
    public facturar(pedido: Pedido, medioPago: IMedioPago): Factura {
        if (!pedido.puedeFacturarse()) {
            throw new ErrorPedidoNoFacturable("El pedido no puede facturarse hasta que todos sus items esten listos.");
        }
        const factura = new Factura(pedido, medioPago, this.calcularDescuento(pedido, medioPago));
        pedido.marcarFacturado();
        this.historial.push(factura);
        return factura;
    }

    /**
     * @returns Copia de las facturas de los pedidos finalizados, en el orden en que se cobraron.
     */
    public getHistorial(): Factura[] {
        return [...this.historial];
    }

    /**
     * @returns El mejor descuento sobre el subtotal del pedido.
     */
    private calcularDescuento(pedido: Pedido, medioPago: IMedioPago): number {
        return this.calcularMejorDescuento(pedido.calcularSubtotal(), medioPago);
    }

    /**
     * @returns El mayor de los descuentos que aplican (nunca se combinan), o 0 si no aplica ninguno.
     */
    private calcularMejorDescuento(total: number, medioPago: IMedioPago): number {
        const montos = this.descuentos.map(descuento => descuento.calcularDescuento(total, medioPago));
        return Math.max(NRO_CERO, ...montos);
    }
}
