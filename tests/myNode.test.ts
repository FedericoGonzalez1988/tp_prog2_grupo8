import MyNode from "../src/myNode";

describe("MyNode", () => {
  it("guarda el valor recibido en el constructor", () => {
    const nodo = new MyNode<number>(5);
    expect(nodo.value).toBe(5);
  });

  it("al crearse no tiene siguiente", () => {
    const nodo = new MyNode<string>("a");
    expect(nodo.next).toBeUndefined();
  });

  it("permite enlazar un nodo siguiente", () => {
    const primero = new MyNode<string>("a");
    const segundo = new MyNode<string>("b");
    primero.next = segundo;
    expect(primero.next).toBe(segundo);
    expect(primero.next.value).toBe("b");
  });
});
