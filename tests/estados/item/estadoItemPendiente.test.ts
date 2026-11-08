
import EstadoItemPendiente from "../../../src/estados/item/estadoItemPendiente";
import EstadoItemEnPreparacion from "../../../src/estados/item/estadoItemEnPreparacion";

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
