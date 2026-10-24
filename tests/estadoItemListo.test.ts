
import EstadoItemListo from "../src/estadoItemListo";
import ErrorItemNoModificable from "../src/error/errorItemNoModificable";

describe("EstadoItemListo", () => {
  let estado: EstadoItemListo;

  beforeEach(() => {
    estado = new EstadoItemListo();
  });

  it("devuelve el nombre Listo", () => {
    expect(estado.getNombre()).toBe("Listo");
  });

  it("indica que el item está listo", () => {
    expect(estado.estaListo()).toBe(true);
  });

  it("permanece en el estado Listo al avanzar", () => {
    expect(estado.siguienteEstado()).toBe(estado);
  });

  it("no permite modificar un item listo", () => {
    expect(() => estado.validarModificacion()).toThrow(
      ErrorItemNoModificable
    );
  });
});
