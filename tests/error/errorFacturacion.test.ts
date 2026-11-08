import ErrorPedidoNoFacturable from "../../src/error/errorPedidoNoFacturable";
import ErrorPedidoYaFacturado from "../../src/error/errorPedidoYaFacturado";

describe("Errores de facturacion", () => {
  it("ErrorPedidoNoFacturable tiene nombre y mensaje por defecto", () => {
    const error = new ErrorPedidoNoFacturable();
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("ErrorPedidoNoFacturable");
    expect(error.message).toBe("El pedido no puede facturarse hasta que todos sus items esten listos.");
  });

  it("ErrorPedidoYaFacturado tiene nombre y mensaje por defecto", () => {
    const error = new ErrorPedidoYaFacturado();
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("ErrorPedidoYaFacturado");
    expect(error.message).toBe("El pedido ya fue facturado.");
  });
});
