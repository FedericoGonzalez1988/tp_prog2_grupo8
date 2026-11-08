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

    public constructor(combo: Combo, cantidad: number) {
        super(cantidad);
        this.combo = combo;
        this.componentes = combo.getProductos().map(producto => new ItemPedidoSimple(producto, cantidad));
    }

    public getCombo(): Combo {
        return this.combo;
    }

    public getDescripcion(): string {
        return this.combo.getNombre();
    }

    public getComponentes(): ItemPedidoSimple[] {
        return this.componentes;
    }

    public getSubtotal(): number {
        return this.combo.getPrecio() * this.getCantidad();
    }

    public estaListo(): boolean {
        return this.componentes.every(componente => componente.estaListo());
    }

    public validarModificacion(): void {
        this.componentes.forEach(componente => componente.validarModificacion());
    }

    public enviarACocina(): void {
        this.componentes.forEach(componente => componente.enviarACocina());
    }
}
