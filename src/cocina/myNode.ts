/**
 * Nodo de una lista enlazada: guarda un valor y la referencia al nodo siguiente.
 * @typeParam T Tipo del valor.
 */
export default class MyNode<T> {
    private _value: T;
    private _next: MyNode<T>;

    /**
     * @param value Valor que guarda el nodo.
     */
    public constructor(value: T) {
        this._value = value;
        this._next = undefined as unknown as MyNode<T>;
    }

    /**
     * @returns El valor del nodo.
     */
    public get value(): T {
        return this._value;
    }

    /**
     * @returns El nodo siguiente.
     */
    public get next(): MyNode<T> {
        return this._next;
    }

    /**
     * @param nodo Nodo siguiente.
     */
    public set next(nodo: MyNode<T>) {
        this._next = nodo;
    }
}