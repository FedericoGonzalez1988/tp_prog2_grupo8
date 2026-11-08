import MyNode from "./myNode";

/**
 * Cola (FIFO) implementada con nodos enlazados: el primero que entra es el primero que sale.
 * @typeParam T Tipo de los elementos.
 */
export default class Cola<T> {
    private first: MyNode<T>;
    private last: MyNode<T>;

    public constructor() {
        this.first = undefined as unknown as MyNode<T>;
        this.last = undefined as unknown as MyNode<T>;
    }

    /**
     * Agrega un elemento al final de la cola.
     * @param value Elemento a agregar.
     */
    public encolar(value: T): void {
        const newNode = new MyNode(value);
        if (!this.first) {
        this.first = newNode;
        }
        else {
        this.last.next = newNode
        }
        this.last = newNode
    }

    /**
     * Saca el primer elemento de la cola.
     * @returns El primer elemento, o undefined si la cola esta vacia.
     */
    public desencolar(): T | undefined {
        if (this.estaVacia()) {
        return undefined;
        }
        const value = this.first.value;
        this.first = this.first.next;
        if (this.first === undefined) {
        this.last = undefined as unknown as MyNode<T>;
        }
        return value;
    }

    /**
     * @returns true si la cola no tiene elementos.
     */
    public estaVacia(): boolean {
        return this.first === undefined && this.last === undefined;
    }

    }
    