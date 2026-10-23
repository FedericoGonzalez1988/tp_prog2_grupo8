import Cola from "../src/cola";

describe("Cola", () => {
  let cola: Cola<number>;

  beforeEach(() => {
    cola = new Cola<number>();
  });

  it("una cola nueva está vacía", () => {
    expect(cola.estaVacia()).toBe(true);
  });

  it("desencolar una cola vacía devuelve undefined", () => {
    expect(cola.desencolar()).toBeUndefined();
  });

  it("después de encolar deja de estar vacía", () => {
    cola.encolar(1);
    expect(cola.estaVacia()).toBe(false);
  });

  it("desencola en el mismo orden en que se encoló (FIFO)", () => {
    cola.encolar(1);
    cola.encolar(2);
    cola.encolar(3);
    expect(cola.desencolar()).toBe(1);
    expect(cola.desencolar()).toBe(2);
    expect(cola.desencolar()).toBe(3);
  });

  it("vuelve a quedar vacía al desencolar todos los elementos", () => {
    cola.encolar(1);
    cola.encolar(2);
    cola.desencolar();
    cola.desencolar();
    expect(cola.estaVacia()).toBe(true);
    expect(cola.desencolar()).toBeUndefined();
  });

  it("se puede reutilizar después de vaciarse", () => {
    cola.encolar(1);
    cola.desencolar();
    cola.encolar(2);
    expect(cola.estaVacia()).toBe(false);
    expect(cola.desencolar()).toBe(2);
  });
});
