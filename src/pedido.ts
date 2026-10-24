import Comida from "./comida";
import ErrorComidaNoDisponible from "./error/errorComidaNoDisponible"


export default class Pedido {
    private productos: Comida[];
    private numeroPedido: string;
    //private estadoPedido:     falta desarrollar

    public constructor(numeroPedido:string, productos:Comida[] = []) {
        this.numeroPedido=numeroPedido;
        this.productos=productos;
    }

    public agregarProducto(producto:Comida):void {
        if (!producto.getDisponible()) {
            throw new ErrorComidaNoDisponible("El producto que quiere agregar no está disponible");
        } 
        this.productos.push(producto);
    }
}