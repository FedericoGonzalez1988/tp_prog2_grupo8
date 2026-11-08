import Comida from "./comida";
import Producto from "./producto";
import ItemPedido from "../pedidos/itemPedido";
import ItemPedidoCombo from "../pedidos/itemPedidoCombo";
import { NRO_CERO, NRO_DOS } from "../constants/constant";
import IEstrategiaPrecioCombo from "./iEstrategiaPrecioCombo";
import ErrorItemsInsuficientesParaCombo from "../error/errorItemsInsuficientesParaCombo";
import ErrorItemsNoDisponiblesEnCombo from "../error/errorItemsNoDisponiblesEnCombo";

/**
 * Agrupacion de dos o mas productos que se vende a un precio especial.
 * El beneficio (descuento porcentual o precio fijo) lo calcula una estrategia (patron Strategy).
 */
export default class Combo extends Comida {
    private idCombo:string;
    private productos:Producto[];
    private estrategiaCalculo:IEstrategiaPrecioCombo;

    /**
     * @param nombre Nombre del combo.
     * @param disponible Indica si hoy se puede pedir.
     * @param idCombo Identificador del combo.
     * @param productos Productos que forman el combo (al menos dos, todos disponibles).
     * @param estrategiaCalculo Estrategia que calcula el precio con beneficio.
     * @throws {ErrorItemsInsuficientesParaCombo} Si tiene menos de dos productos.
     * @throws {ErrorItemsNoDisponiblesEnCombo} Si alguno de los productos no esta disponible.
     */
    public constructor(
        nombre: string,
        disponible: boolean,
        idCombo: string,
        productos: Producto[],
        estrategiaCalculo:IEstrategiaPrecioCombo) {

            super(nombre, disponible);

            if (productos.length < NRO_DOS) {
                throw new ErrorItemsInsuficientesParaCombo("El combo debe tener al menos dos productos");
            }

            const productosNoDisponibles = productos.filter(producto => !producto.getDisponible());
            if (productosNoDisponibles.length > NRO_CERO) {
                throw new ErrorItemsNoDisponiblesEnCombo("Un combo no puede tener items que no esten disponibles");
            }
            this.idCombo = idCombo;
            this.productos = productos;
            this.estrategiaCalculo=estrategiaCalculo;
        }

    /**
     * @returns El identificador del combo.
     */
    public getIdCombo():string {
        return this.idCombo;
    }

    /**
     * @returns Los productos que forman el combo.
     */
    public getProductos(): Producto[] {
        return this.productos;
    }

    /**
     * Suma los precios de los productos y le aplica el beneficio de la estrategia.
     * @returns El precio del combo con su beneficio.
     */
    public getPrecio(): number {
        let precioComboSinDescuentos=0;

        for (const producto of this.productos) {
            precioComboSinDescuentos+=producto.getPrecio();
        }

        return this.estrategiaCalculo.calcularPrecio(precioComboSinDescuentos);
    }

    /**
     * @param cantidad Cantidad de combos pedidos.
     * @returns Un ItemPedidoCombo de este combo.
     */
    public crearItemPedido(cantidad: number): ItemPedido {
        return new ItemPedidoCombo(this, cantidad);
    }
}
