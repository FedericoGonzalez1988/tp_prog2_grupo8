import DescuentoEfectivo from "../src/descuentoEfectivo";
import Efectivo from "../src/efectivo";
import TarjetaCredito from "../src/tarjetaCredito";
import BilleteraVirtual from "../src/billeteraVirtual";

describe("DescuentoEfectivo", () => {
  const descuento = new DescuentoEfectivo(10);

  it("descuenta el porcentaje del total si se paga en efectivo", () => {
    expect(descuento.calcularDescuento(10000, new Efectivo())).toBe(1000);
  });

  it("no descuenta nada si se paga con tarjeta", () => {
    expect(descuento.calcularDescuento(10000, new TarjetaCredito())).toBe(0);
  });

  it("no descuenta nada si se paga con billetera virtual", () => {
    expect(descuento.calcularDescuento(10000, new BilleteraVirtual())).toBe(0);
  });
});
