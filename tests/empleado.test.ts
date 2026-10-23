import Empleado from "../src/empleado";

// Empleado es abstracta: se usa una subclase mínima solo para poder instanciarla
class EmpleadoDePrueba extends Empleado {}

describe("Empleado", () => {
  let empleado: Empleado;

  beforeEach(() => {
    empleado = new EmpleadoDePrueba("Ana", "20-12345678-9", "Salón");
  });

  it("getNombre devuelve el nombre del constructor", () => {
    expect(empleado.getNombre()).toBe("Ana");
  });

  it("getCuil devuelve el cuil del constructor", () => {
    expect(empleado.getCuil()).toBe("20-12345678-9");
  });

  it("getSector devuelve el sector del constructor", () => {
    expect(empleado.getSector()).toBe("Salón");
  });
});
