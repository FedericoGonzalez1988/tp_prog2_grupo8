import LineaFactura from "../../src/pago/lineaFactura";

describe("LineaFactura", () => {
  it("guarda la descripcion, la cantidad y el importe", () => {
    const linea = new LineaFactura("Milanesa", 2, 12000);

    expect(linea.getDescripcion()).toBe("Milanesa");
    expect(linea.getCantidad()).toBe(2);
    expect(linea.getImporte()).toBe(12000);
  });
});
