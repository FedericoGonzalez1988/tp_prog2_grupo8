import Comida from "./comida";
import Item from "./item";
import Estado from "./estado";

export default class Combo extends Comida {
    private idCombo:string;
    private porcentajeDescuento:number;
    private itemsCombo:Item[];

    public constructor(nombre: string, disponible: boolean, idCombo: string, itemsCombo: Item[]);
    public constructor(nombre: string, disponible: boolean, idCombo: string, itemsCombo: Item[], porcentajeDescuento: number);
    public constructor(nombre: string, disponible: boolean, idCombo: string, itemsCombo: Item[], porcentajeDescuento?: number) {
        super(nombre, disponible);
        this.idCombo = idCombo;
        this.itemsCombo = itemsCombo; // falta verificacion "itemsCombo.length>1" y disponibilidad items. y excepcion
        this.porcentajeDescuento = porcentajeDescuento ?? 5;
    }

    public getIdCombo():string {
        return this.idCombo;
    }

    public getPrecio(): number {
        let precioComboSinDescuentos=0;
        let precioCombo=0;
        for(const item of this.itemsCombo) {
            precioComboSinDescuentos+=item.getPrecio();
        }
        precioCombo=precioComboSinDescuentos-(precioComboSinDescuentos*this.porcentajeDescuento/100);
        return precioCombo;
    }

    //este metodo chequearEstado deberá ser revisado cuando definamos la clase Estado
    public chequearEstado(): Estado {
        for (const item of this.itemsCombo) {
            const estadoItem = item.chequearEstado();
            if (estadoItem !== "Listo") {
                return estadoItem; 
            }
        }
        return "Listo";      
    }
}