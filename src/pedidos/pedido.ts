import Comida from "../menu/comida";
import ItemPedido from "./itemPedido";
import Modificacion from "./modificacion";
import IEstadoPedido from "../estados/pedido/iEstadoPedido";
import EstadoEnConstruccion from "../estados/pedido/estadoEnConstruccion";
import ErrorComidaNoDisponible from "../error/errorComidaNoDisponible";
import ErrorPedidoYaConfirmado from "../error/errorPedidoYaConfirmado";
import { NRO_CERO, NRO_UNO } from "../constants/constant";


/**
 * Pedido de un cliente, con sus items y su estado (patron State).
 * Cada modalidad (salon, para llevar, delivery) es una subclase con sus datos particulares.
 */
export default abstract class Pedido {
    private numeroPedido: string;
    private items: ItemPedido[];
    private estado: IEstadoPedido;
    /**
     * Cambios hechos mientras el pedido esta en construccion, del mas viejo al mas nuevo.
     * Se usan para deshacer la ultima modificacion.
     */
    private modificaciones: Modificacion[];

    /**
     * El pedido empieza en construccion.
     * @param numeroPedido Identificador del pedido.
     * @param productos Productos con los que arranca el pedido (cada uno se agrega con cantidad 1).
     */
    public constructor(numeroPedido:string, productos:Comida[] = []) {
        this.numeroPedido = numeroPedido;
        this.items = [];
        this.modificaciones = [];
        this.estado = new EstadoEnConstruccion();
        productos.forEach(producto => this.agregarProducto(producto));
    }

    /**
     * @returns El identificador del pedido.
     */
    public getNumeroPedido(): string {
        return this.numeroPedido;
    }

    /**
     * @returns Los items del pedido, en el orden en que se cargaron.
     */
    public getItems(): ItemPedido[] {
        return this.items;
    }

    /**
     * Agrega un producto o combo al pedido y anota la modificacion.
     * @param producto Comida del menu a agregar.
     * @param cantidad Cantidad pedida (1 por defecto).
     * @throws {ErrorPedidoYaConfirmado} Si el pedido ya no esta en construccion.
     * @throws {ErrorComidaNoDisponible} Si la comida no esta disponible.
     */
    public agregarProducto(producto:Comida, cantidad: number = NRO_UNO):void {
        this.validarPedidoModificable();
        if (!producto.getDisponible()) {
            throw new ErrorComidaNoDisponible("El producto que quiere agregar no está disponible");
        }
        const item = producto.crearItemPedido(cantidad);
        this.items.push(item);
        this.modificaciones.push({ tipo: "agregar", item, posicion: this.items.length - NRO_UNO });
    }

    /**
     * Quita un item del pedido y anota la modificacion. Si el item no esta en el pedido, no hace nada.
     * @param item Item a quitar.
     * @throws {ErrorPedidoYaConfirmado} Si el pedido ya no esta en construccion.
     * @throws {ErrorItemNoModificable} Si el item ya esta en preparacion o listo.
     */
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

    /**
     * Confirma el pedido y envia cada item a la estacion de cocina que le corresponde.
     * @throws {ErrorPedidoYaConfirmado} Si el pedido ya estaba confirmado.
     */
    public confirmar(): void {
        this.estado = this.estado.confirmar();
        this.items.forEach(item => item.enviarACocina());
    }

    /**
     * Marca el pedido como listo para facturar.
     * @throws {ErrorPedidoNoConfirmado} Si el pedido todavia esta en construccion.
     */
    public marcarListo(): void {
        this.estado = this.estado.marcarListo();
    }

    /**
     * Pasa el pedido a su estado final. Lo invoca la Caja al facturarlo.
     * @throws {ErrorPedidoNoFacturable} Si el pedido todavia no esta listo.
     * @throws {ErrorPedidoYaFacturado} Si el pedido ya fue facturado.
     */
    public marcarFacturado(): void {
        this.estado = this.estado.marcarFacturado();
    }

    /**
     * Suma de los items del pedido (productos y combos con su beneficio). Es la base de los descuentos.
     * @returns El subtotal del pedido.
     */
    public calcularSubtotal(): number {
        return this.items.reduce((total, item) => total + item.getSubtotal(), NRO_CERO);
    }

    /**
     * Total del pedido. Las modalidades con cargos extra (por ejemplo, el envio) lo sobrescriben.
     * @returns El total del pedido.
     */
    public calcularTotal(): number {
        return this.calcularSubtotal();
    }

    /**
     * @returns true si el pedido esta listo y todos sus items tambien.
     */
    public puedeFacturarse(): boolean {
        return this.estado.puedeFacturarse() && this.items.every(item => item.estaListo());
    }

    /**
     * Deshace la ultima modificacion anotada: si fue "agregar" quita ese item,
     * si fue "quitar" lo vuelve a poner en la posicion que tenia.
     * @returns El item afectado, o null si no hay nada para deshacer.
     * @throws {ErrorPedidoYaConfirmado} Si el pedido ya no esta en construccion.
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
     * @param item Item hasta el que se borra. Si no esta en el pedido, no hace nada.
     * @throws {ErrorPedidoYaConfirmado} Si el pedido ya no esta en construccion.
     * @throws {ErrorItemNoModificable} Si alguno de los items a borrar ya esta en preparacion o listo.
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

    /**
     * @throws {ErrorPedidoYaConfirmado} Si el estado actual no permite modificar el pedido.
     */
    private validarPedidoModificable(): void {
        if (!this.estado.puedeModificar()) {
            throw new ErrorPedidoYaConfirmado("No se puede modificar un pedido que ya fue confirmado.");
        }
    }
}
