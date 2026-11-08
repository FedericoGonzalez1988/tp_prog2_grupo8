import MyNode from "./myNode";

export default class Cola<T> {
    private first: MyNode<T>;
    private last: MyNode<T>;

    public constructor() {
        this.first = undefined as unknown as MyNode<T>;
        this.last = undefined as unknown as MyNode<T>;
    }

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

    public estaVacia(): boolean {
        return this.first === undefined && this.last === undefined;
    }

    }
    