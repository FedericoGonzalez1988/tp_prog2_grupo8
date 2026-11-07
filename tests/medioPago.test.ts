import Efectivo from "../src/efectivo";
import TarjetaDebito from "../src/tarjetaDebito";
import TarjetaCredito from "../src/tarjetaCredito";
import BilleteraVirtual from "../src/billeteraVirtual";

describe("Medios de pago", () => {
  it("Efectivo se identifica como efectivo", () => {
    const medio = new Efectivo();
    expect(medio.getNombre()).toBe("Efectivo");
    expect(medio.esEfectivo()).toBe(true);
  });

  it("TarjetaDebito no es efectivo", () => {
    const medio = new TarjetaDebito();
    expect(medio.getNombre()).toBe("Tarjeta de Debito");
    expect(medio.esEfectivo()).toBe(false);
  });

  it("TarjetaCredito no es efectivo", () => {
    const medio = new TarjetaCredito();
    expect(medio.getNombre()).toBe("Tarjeta de Credito");
    expect(medio.esEfectivo()).toBe(false);
  });

  it("BilleteraVirtual no es efectivo", () => {
    const medio = new BilleteraVirtual();
    expect(medio.getNombre()).toBe("Billetera Virtual");
    expect(medio.esEfectivo()).toBe(false);
  });
});
