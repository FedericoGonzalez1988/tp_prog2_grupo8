import Comida from "./comida";
import Producto from "./producto";
import ItemPedido from "./itemPedido";
import ItemPedidoCombo from "./itemPedidoCombo";
import { NRO_CERO, NRO_DOS } from "./constants/constant";
import IEstrategiaPrecioCombo from "./iEstrategiaPrecioCombo";
import ErrorItemsInsuficientesParaCombo from "./error/errorItemsInsuficientesParaCombo";
import ErrorItemsNoDisponiblesEnCombo from "./error/errorItemsNoDisponiblesEnCombo";

export default class Combo extends Comida {
    private idCombo:string;
    private productos:Producto[];
    private estrategiaCalculo:IEstrategiaPrecioCombo;

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

    public getIdCombo():string {
        return this.idCombo;
    }

    public getProductos(): Producto[] {
        return this.productos;
    }

    public getPrecio(): number {
        let precioComboSinDescuentos=0;

        for (const producto of this.productos) {
            precioComboSinDescuentos+=producto.getPrecio();
        }

        return this.estrategiaCalculo.calcularPrecio(precioComboSinDescuentos);
    }

    public crearItemPedido(cantidad: number): ItemPedido {
        return new ItemPedidoCombo(this, cantidad);
    }
}
