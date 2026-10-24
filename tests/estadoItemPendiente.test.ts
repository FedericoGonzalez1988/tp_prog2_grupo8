
import EstadoItemPendiente from "../src/estadoItemPendiente";
import EstadoItemEnPreparacion from "../src/estadoItemEnPreparacion";

describe("EstadoItemPendiente", () => {
  let estado: EstadoItemPendiente;

  beforeEach(() => {
    estado = new EstadoItemPendiente();
  });

  it("devuelve el nombre Pendiente", () => {
    expect(estado.getNombre()).toBe("Pendiente");
  });

  it("indica que el item no está listo", () => {
    expect(estado.estaListo()).toBe(false);
  });

  it("avanza al estado En Preparacion", () => {
    expect(estado.siguienteEstado()).toBeInstanceOf(
      EstadoItemEnPreparacion
    );
  });

  it("permite validar modificaciones sin lanzar errores", () => {
    expect(() => estado.validarModificacion()).not.toThrow();
  });
});
