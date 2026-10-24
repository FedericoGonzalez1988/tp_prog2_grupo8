import Comida from "./comida";
import Item from "./item";
import { NRO_CERO, NRO_DOS } from "./constants/constant";
import IEstrategiaPrecioCombo from "./iEstrategiaPrecioCombo";
import ErrorItemsInsuficientesParaCombo from "./error/errorItemsInsuficientesParaCombo";
import ErrorItemsNoDisponiblesEnCombo from "./error/errorItemsNoDisponiblesEnCombo";

export default class Combo extends Comida {
    private idCombo:string;
    private itemsCombo:Item[];
    private estrategiaCalculo:IEstrategiaPrecioCombo;

    public constructor(
        nombre: string, 
        disponible: boolean, 
        idCombo: string, 
        itemsCombo: Item[], 
        estrategiaCalculo:IEstrategiaPrecioCombo) {
    
            super(nombre, disponible);

            if (itemsCombo.length < NRO_DOS) {
                throw new ErrorItemsInsuficientesParaCombo("El combo debe tener al menos dos productos");
            }

            const itemsNoDisponibles = itemsCombo.filter(item => !item.getDisponible());
            if (itemsNoDisponibles.length > NRO_CERO) {
                throw new ErrorItemsNoDisponiblesEnCombo("Un combo no puede tener items que no esten disponibles");
            }
            this.idCombo = idCombo;
            this.itemsCombo = itemsCombo; 
            this.estrategiaCalculo=estrategiaCalculo;        
        }

    public getIdCombo():string {
        return this.idCombo;
    }

    public getPrecio(): number {
        let precioComboSinDescuentos=0;
        
        for (const item of this.itemsCombo) {
            precioComboSinDescuentos+=item.getPrecio();
        }
        
        return this.estrategiaCalculo.calcularPrecio(precioComboSinDescuentos);;
    }

   
    public estaListo(): boolean {
        return this.itemsCombo.every(elemento => elemento.estaListo());
    }
}