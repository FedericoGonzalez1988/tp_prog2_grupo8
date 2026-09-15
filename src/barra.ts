import Item from "./item";
import Estacion from "./estacion";

export default class Barra extends Estacion {
    private items: Item[];

    // constructor segun como se defina en clase Estacion

    public modificarEstadoItem(item:Item):void {
        item.setEstado("Listo"); //todavia no está definido como va a ser Estado
    }
}