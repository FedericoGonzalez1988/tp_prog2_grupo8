/* eslint-disable @typescript-eslint/no-magic-numbers */

import DescuentoEfectivo from "../../src/pago/descuentoEfectivo";
import Efectivo from "../../src/pago/efectivo";
import TarjetaCredito from "../../src/pago/tarjetaCredito";
import BilleteraVirtual from "../../src/pago/billeteraVirtual";

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
