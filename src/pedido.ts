import Comida from "./comida";
import ItemPedido from "./itemPedido";
import IEstadoPedido from "./iEstadoPedido";
import EstadoEnConstruccion from "./estadoEnConstruccion";
import ErrorComidaNoDisponible from "./error/errorComidaNoDisponible";
import ErrorPedidoYaConfirmado from "./error/errorPedidoYaConfirmado";
import { NRO_CERO, NRO_UNO } from "./constants/constant";


export default abstract class Pedido {
    private numeroPedido: string;
    private items: ItemPedido[];
    private estado: IEstadoPedido;

    public constructor(numeroPedido:string, productos:Comida[] = []) {
        this.numeroPedido = numeroPedido;
        this.items = [];
        this.estado = new EstadoEnConstruccion();
        productos.forEach(producto => this.agregarProducto(producto));
    }

    public getNumeroPedido(): string {
        return this.numeroPedido;
    }

    public getItems(): ItemPedido[] {
        return this.items;
    }

    public agregarProducto(producto:Comida, cantidad: number = NRO_UNO):void {
        this.validarPedidoModificable();
        if (!producto.getDisponible()) {
            throw new ErrorComidaNoDisponible("El producto que quiere agregar no está disponible");
        }
        this.items.push(producto.crearItemPedido(cantidad));
    }

    public quitarItem(item: ItemPedido): void {
        this.validarPedidoModificable();
        const posicion = this.items.indexOf(item);
        if (posicion < NRO_CERO) {
            return;
        }
        item.validarModificacion();
        this.items.splice(posicion, NRO_UNO);
    }

    /** Confirma el pedido y envia cada item a la estacion de cocina que le corresponde. */
    public confirmar(): void {
        this.estado = this.estado.confirmar();
        this.items.forEach(item => item.enviarACocina());
    }

    public marcarListo(): void {
        this.estado = this.estado.marcarListo();
    }

    /** Pasa el pedido a su estado final. Lo invoca la Caja al facturarlo. */
    public marcarFacturado(): void {
        this.estado = this.estado.marcarFacturado();
    }

    /** Suma de los items del pedido (productos y combos con su beneficio). Es la base de los descuentos. */
    public calcularSubtotal(): number {
        return this.items.reduce((total, item) => total + item.getSubtotal(), NRO_CERO);
    }

    /** Total del pedido. Las modalidades con cargos extra (ej. envio) lo sobrescriben. */
    public calcularTotal(): number {
        return this.calcularSubtotal();
    }

    public puedeFacturarse(): boolean {
        return this.estado.puedeFacturarse() && this.items.every(item => item.estaListo());
    }

    /** Quita y devuelve el ultimo item cargado, o null si el pedido esta vacio. */
    protected deshacerUltimo(): ItemPedido | null {
        this.validarPedidoModificable();
        const ultimo = this.items[this.items.length - NRO_UNO];
        if (!ultimo) {
            return null;
        }
        ultimo.validarModificacion();
        this.items.pop();
        return ultimo;
    }

    /** Quita desde el ultimo item cargado hasta el indicado (inclusive). */
    protected quitarHasta(item: ItemPedido): void {
        this.validarPedidoModificable();
        const posicion = this.items.indexOf(item);
        if (posicion < NRO_CERO) {
            return;
        }
        this.items.slice(posicion).forEach(itemAQuitar => itemAQuitar.validarModificacion());
        this.items.splice(posicion);
    }

    private validarPedidoModificable(): void {
        if (!this.estado.puedeModificar()) {
            throw new ErrorPedidoYaConfirmado("No se puede modificar un pedido que ya fue confirmado.");
        }
    }
}
