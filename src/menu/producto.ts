import Comida from "./comida";
import Estacion from "../cocina/estacion";
import ItemPedido from "../pedidos/itemPedido";
import ItemPedidoSimple from "../pedidos/itemPedidoSimple";


export default class Producto extends Comida {

    private precio: number;
    private estacion: Estacion;

    public constructor(
        nombre:string,
        disponible:boolean,
        precio: number,
        estacion: Estacion) {
        super(nombre, disponible);
        this.precio=precio;
        this.estacion=estacion;
    }

    public setPrecio(precio: number): void {
        this.precio = precio;
    }

    public getPrecio(): number {
        return this.precio;
    }

    public setEstacion(estacion: Estacion): void {
        this.estacion = estacion;
    }

    public getEstacion(): Estacion {
        return this.estacion;
    }

    public crearItemPedido(cantidad: number): ItemPedido {
        return new ItemPedidoSimple(this, cantidad);
    }

}
