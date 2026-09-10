import Item from "./item";

export default class Combo {
    private idCombo:string;
    private porcentajeDescuento:number;
    private itemsCombo:Item[];

    public constructor(idCombo: string, itemsCombo: Item[]);
    public constructor(idCombo: string, itemsCombo: Item[], porcentajeDescuento: number);
    public constructor(idCombo: string, itemsCombo: Item[], porcentajeDescuento?: number) {
        this.idCombo = idCombo;
        this.itemsCombo = itemsCombo; // falta verificacion "itemsCombo.length>1" y disponibilidad items. y excepcion
        this.porcentajeDescuento = porcentajeDescuento ?? 5;
    }

    public getIdCombo():string {
        return this.idCombo;
    }

    public obtenerPrecioCombo():number {
        let precioComboSinDescuentos=0;
        let precioCombo=0;
        for(const item of this.itemsCombo) {
            precioComboSinDescuentos+=item.getPrecio();
        }
        precioCombo=precioComboSinDescuentos-(precioComboSinDescuentos*this.porcentajeDescuento/100);
        return precioCombo;
    }
}