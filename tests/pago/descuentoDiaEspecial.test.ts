import DescuentoDiaEspecial from "../../src/pago/descuentoDiaEspecial";
import DiaSemana from "../../src/pago/diaSemana";

// Fechas fijas para no depender del dia en que se corren los tests (los meses arrancan en 0)
const UN_MARTES = new Date(2026, 10, 10);
const UN_MIERCOLES = new Date(2026, 10, 11);

describe("DescuentoDiaEspecial", () => {
  const descuentoMartes = new DescuentoDiaEspecial(DiaSemana.MARTES, 15);

  afterEach(() => {
    jest.useRealTimers();
  });

  it("descuenta el porcentaje del total el dia especial", () => {
    jest.useFakeTimers().setSystemTime(UN_MARTES);
    expect(descuentoMartes.calcularDescuento(10000)).toBe(1500);
  });

  it("no descuenta nada otro dia de la semana", () => {
    jest.useFakeTimers().setSystemTime(UN_MIERCOLES);
    expect(descuentoMartes.calcularDescuento(10000)).toBe(0);
  });

  it("DiaSemana coincide con Date.getDay()", () => {
    expect(UN_MARTES.getDay()).toBe(DiaSemana.MARTES);
    expect(new Date(2026, 10, 8).getDay()).toBe(DiaSemana.DOMINGO);
    expect(new Date(2026, 10, 14).getDay()).toBe(DiaSemana.SABADO);
  });
});
