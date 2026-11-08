import Comida from "./comida";

export default class Menu { 
    private items: Comida[];
    public constructor (item:Comida[] = []) {
        this.items = item;
    }

    public agregarItem(item:Comida): void {
        this.items.push(item);
    }

    public quitarItem(item:Comida): void {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] === item) {
                const cantidadItemsEliminar = 1;
                this.items.splice(i,cantidadItemsEliminar);
                break;
            }
        }
    }
    public getItems(): Comida[] {
        return this.items
    }
}