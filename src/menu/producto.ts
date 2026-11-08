import Comida from "./comida";
import Estacion from "../cocina/estacion";
import ItemPedido from "../pedidos/itemPedido";
import ItemPedidoSimple from "../pedidos/itemPedidoSimple";


/**
 * Producto individual del menu (por ejemplo, una milanesa o una gaseosa).
 * Conoce su precio y la estacion de cocina que lo prepara.
 */
export default class Producto extends Comida {

    private precio: number;
    private estacion: Estacion;

    /**
     * @param nombre Nombre del producto.
     * @param disponible Indica si hoy se puede pedir.
     * @param precio Precio de venta.
     * @param estacion Estacion de cocina que lo prepara.
     */
    public constructor(
        nombre:string,
        disponible:boolean,
        precio: number,
        estacion: Estacion) {
        super(nombre, disponible);
        this.precio=precio;
        this.estacion=estacion;
    }

    /**
     * @param precio Nuevo precio de venta.
     */
    public setPrecio(precio: number): void {
        this.precio = precio;
    }

    /**
     * @returns El precio de venta del producto.
     */
    public getPrecio(): number {
        return this.precio;
    }

    /**
     * @param estacion Nueva estacion que prepara el producto.
     */
    public setEstacion(estacion: Estacion): void {
        this.estacion = estacion;
    }

    /**
     * @returns La estacion de cocina que prepara el producto.
     */
    public getEstacion(): Estacion {
        return this.estacion;
    }

    /**
     * @param cantidad Cantidad pedida.
     * @returns Un ItemPedidoSimple de este producto.
     */
    public crearItemPedido(cantidad: number): ItemPedido {
        return new ItemPedidoSimple(this, cantidad);
    }

}
