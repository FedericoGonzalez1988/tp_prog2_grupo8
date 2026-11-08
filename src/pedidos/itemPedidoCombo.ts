import ItemPedido from "./itemPedido";
import ItemPedidoSimple from "./itemPedidoSimple";
import Combo from "../menu/combo";

/**
 * Item de pedido de un combo. No tiene estado propio: crea un ItemPedidoSimple
 * por cada producto del combo, y cada uno se prepara en su propia estacion.
 */
export default class ItemPedidoCombo extends ItemPedido {
    private combo: Combo;
    private componentes: ItemPedidoSimple[];

    /**
     * @param combo Combo pedido.
     * @param cantidad Cantidad de combos (cada componente se crea con esta misma cantidad).
     */
    public constructor(combo: Combo, cantidad: number) {
        super(cantidad);
        this.combo = combo;
        this.componentes = combo.getProductos().map(producto => new ItemPedidoSimple(producto, cantidad));
    }

    /**
     * @returns El combo pedido.
     */
    public getCombo(): Combo {
        return this.combo;
    }

    /**
     * @returns El nombre del combo.
     */
    public getDescripcion(): string {
        return this.combo.getNombre();
    }

    /**
     * @returns Un item por cada producto del combo.
     */
    public getComponentes(): ItemPedidoSimple[] {
        return this.componentes;
    }

    /**
     * @returns El precio del combo (con su beneficio) por la cantidad.
     */
    public getSubtotal(): number {
        return this.combo.getPrecio() * this.getCantidad();
    }

    /**
     * @returns true si todos los componentes estan listos.
     */
    public estaListo(): boolean {
        return this.componentes.every(componente => componente.estaListo());
    }

    /**
     * @throws {ErrorItemNoModificable} Si algun componente ya esta en preparacion o listo.
     */
    public validarModificacion(): void {
        this.componentes.forEach(componente => componente.validarModificacion());
    }

    /** Envia cada componente a la estacion de su producto. El combo en si no se encola. */
    public enviarACocina(): void {
        this.componentes.forEach(componente => componente.enviarACocina());
    }
}
