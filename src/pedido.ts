export default class Pedido {
    private productosIndividuales: Item[];
    private productosCombinados: Combo[];
    private numeroPedido: string;
    //private estadoPedido:     falta desarrollar

    //en esta primera instancia creamos el constructor como si siempre recibiera elementos de tipo Item y de tipo Combo, no estamos evaluando la posibilidad de que reciba solo Items o solo Combos. Con sobrecarga "no se podría" hacer ya que TypeScript no reconoce los tipos de datos que no sean nativos, recibiria un Array y no sabria si es de tipo Item o de tipo Combo. Otra posibilidad: que todos los Pedidos se inicien vacios y que se vayan agregando Items y Combos.
    public constructor(numeroPedido:string, productosIndividuales:Item[], productosCombinados:Combo[]) {
        this.numeroPedido=numeroPedido;
        this.productosIndividuales=productosIndividuales;
        this.productosCombinados=productosCombinados;
    }

    public agregarItem(item:Item) {
        //compruebo si el item está disponible, habria que ver el nombre de ese atributo, podria ser un boolean 'estaDisponible'
        if(item.estado) {
            this.productosIndividuales.push(item);
        }
    }

    public agregarCombo(combo:Combo) {
        if(combo.estaDisponible) {
            this.productosCombinados.push(combo);
        }
    }
}