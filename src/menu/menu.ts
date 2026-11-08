import Comida from "./comida";

/** Carta del restaurante: los productos y combos que se pueden pedir. */
export default class Menu { 
    private items: Comida[];
    /**
     * @param item Comidas con las que arranca el menu (vacio por defecto).
     */
    public constructor (item:Comida[] = []) {
        this.items = item;
    }

    /**
     * @param item Comida que se agrega al final del menu.
     */
    public agregarItem(item:Comida): void {
        this.items.push(item);
    }

    /**
     * Quita una sola aparicion de la comida indicada. Si no esta, no hace nada.
     * @param item Comida a quitar.
     */
    public quitarItem(item:Comida): void {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] === item) {
                const cantidadItemsEliminar = 1;
                this.items.splice(i,cantidadItemsEliminar);
                break;
            }
        }
    }
    /**
     * @returns Las comidas del menu.
     */
    public getItems(): Comida[] {
        return this.items
    }
}