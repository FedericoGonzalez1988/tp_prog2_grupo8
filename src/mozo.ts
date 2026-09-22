import Comida from "./comida";
import Salon from "./salon";
import Empleado from "./empleado";

export default class Mozo extends Empleado {
    private mesasAsignadas:Mesa[]; //Puede que no sea necesario este atributo
    private pedidoEnConstruccion: Salon;

    constructor( nombre: string,  cuil: number, sector: string, mesasAsignadas: Mesa[]) {
        super(nombre, cuil, sector);
        this.mesasAsignadas=mesasAsignadas;
    }

    //modificar en clase Salon el atributo "mozo : Mozo (en vez de Empleado)"
    public agregarItem(pedido:Salon, item:Comida):void {
        pedido.push(item);
    }
    

    public corregirItem(pedido:Salon, item:Comida) {
        //metodo a definir cuando se elija estructura de datos
    }

    public confirmarPedido(pedido:Salon) {
        //metodo a definir. Deberia enviar el pedido a Cocina o a las distintas Estaciones y liberar el array de Pedido para poder cargar el proximo que hagan
    }
}