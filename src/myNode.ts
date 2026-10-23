export default class MyNode<T> {
    private _value: T;
    private _next: MyNode<T>;

    public constructor(value: T) {
        this._value = value;
        this._next = undefined as unknown as MyNode<T>;
    }

    public get value(): T {
        return this._value;
    }

    public get next(): MyNode<T> {
        return this._next;
    }

    public set next(nodo: MyNode<T>) {
        this._next = nodo;
    }
}