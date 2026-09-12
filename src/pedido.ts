export default class Pedido {
    private productos: Comida[];
    private numeroPedido: string;
    //private estadoPedido:     falta desarrollar

    public constructor(numeroPedido:string, productos:Comida[] = []) {
        this.numeroPedido=numeroPedido;
        this.productos=productos;
    }

    public agregarProducto(producto:Comida) {
        if(producto.disponible) {
            this.productos.push(producto);
        } //falta excepcion por producto no disponible
    }
}