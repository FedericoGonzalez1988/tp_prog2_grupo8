import Comida from "./comida";
import ItemPedido from "./itemPedido";
import Modificacion from "./modificacion";
import IEstadoPedido from "./iEstadoPedido";
import EstadoEnConstruccion from "./estadoEnConstruccion";
import ErrorComidaNoDisponible from "./error/errorComidaNoDisponible";
import ErrorPedidoYaConfirmado from "./error/errorPedidoYaConfirmado";
import { NRO_CERO, NRO_UNO } from "./constants/constant";


export default abstract class Pedido {
    private numeroPedido: string;
    private items: ItemPedido[];
    private estado: IEstadoPedido;
    /** Cambios hechos mientras el pedido esta en construccion, del mas viejo al mas nuevo. */
    private modificaciones: Modificacion[];

    public constructor(numeroPedido:string, productos:Comida[] = []) {
        this.numeroPedido = numeroPedido;
        this.items = [];
        this.modificaciones = [];
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
        const item = producto.crearItemPedido(cantidad);
        this.items.push(item);
        this.modificaciones.push({ tipo: "agregar", item, posicion: this.items.length - NRO_UNO });
    }

    public quitarItem(item: ItemPedido): void {
        this.validarPedidoModificable();
        const posicion = this.items.indexOf(item);
        if (posicion < NRO_CERO) {
            return;
        }
        item.validarModificacion();
        this.items.splice(posicion, NRO_UNO);
        this.modificaciones.push({ tipo: "quitar", item, posicion });
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

    /**
     * Deshace la ultima modificacion anotada: si fue "agregar" quita ese item,
     * si fue "quitar" lo vuelve a poner en la posicion que tenia.
     * Devuelve el item afectado, o null si no hay nada para deshacer.
     */
    protected deshacerUltimo(): ItemPedido | null {
        this.validarPedidoModificable();
        const ultima = this.modificaciones[this.modificaciones.length - NRO_UNO];
        if (!ultima) {
            return null;
        }
        ultima.item.validarModificacion();
        this.modificaciones.pop();
        if (ultima.tipo === "agregar") {
            this.items.splice(ultima.posicion, NRO_UNO);
        } else {
            this.items.splice(ultima.posicion, NRO_CERO, ultima.item);
        }
        return ultima.item;
    }

    /**
     * Quita desde el ultimo item cargado hasta el indicado (inclusive).
     * Anota un "quitar" por cada item, asi se pueden deshacer de a uno.
     */
    protected quitarHasta(item: ItemPedido): void {
        this.validarPedidoModificable();
        const posicion = this.items.indexOf(item);
        if (posicion < NRO_CERO) {
            return;
        }
        this.items.slice(posicion).forEach(itemAQuitar => itemAQuitar.validarModificacion());
        for (let i = this.items.length - NRO_UNO; i >= posicion; i--) {
            this.modificaciones.push({ tipo: "quitar", item: this.items[i], posicion: i });
        }
        this.items.splice(posicion);
    }

    private validarPedidoModificable(): void {
        if (!this.estado.puedeModificar()) {
            throw new ErrorPedidoYaConfirmado("No se puede modificar un pedido que ya fue confirmado.");
        }
    }
}
