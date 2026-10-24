
import EstadoItemEnPreparacion from "../src/estadoItemEnPreparacion";
import EstadoItemListo from "../src/estadoItemListo";
import ErrorItemNoModificable from "../src/error/errorItemNoModificable";

describe("EstadoItemEnPreparacion", () => {
  let estado: EstadoItemEnPreparacion;

  beforeEach(() => {
    estado = new EstadoItemEnPreparacion();
  });

  it("devuelve el nombre En Preparacion", () => {
    expect(estado.getNombre()).toBe("En Preparacion");
  });

  it("indica que el item no está listo", () => {
    expect(estado.estaListo()).toBe(false);
  });

  it("avanza al estado Listo", () => {
    expect(estado.siguienteEstado()).toBeInstanceOf(
      EstadoItemListo
    );
  });

  it("no permite modificar un item en preparación", () => {
    expect(() => estado.validarModificacion()).toThrow(
      ErrorItemNoModificable
    );
  });
});
