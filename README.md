# 🍽 Fogón del Barrio — Gestión de Pedidos en un Restaurante

Trabajo práctico de **Programación 2** (grupo 8). Sistema en TypeScript que digitaliza la gestión de pedidos de un restaurante: desde que el cliente hace el pedido, pasando por la preparación en las estaciones de cocina, hasta el cobro y el historial de lo facturado.

## Funcionalidades

- **Tres modalidades de pedido**: en el salón (mesa y mozo), para llevar (horario de retiro) y delivery (dirección, cadete y costo de envío).
- **Menú con productos y combos**. El beneficio del combo puede ser un descuento porcentual o un precio fijo.
- **Corrección de pedidos en construcción**: agregar y quitar productos, deshacer la última modificación y borrar hasta un ítem determinado.
- **Cocina por estaciones** (parrilla, cocina fría, barra y cocina dulce). Cada estación prepara sus ítems en el orden en que llegaron, y cada ítem pasa por *pendiente → en preparación → listo*.
- **Cobro** con efectivo, tarjeta de débito, tarjeta de crédito o billetera virtual. Se aplica un descuento por pago en efectivo o por día especial, solo el más beneficioso. El costo de envío nunca recibe descuento.
- **Facturación e historial**: un pedido solo se factura cuando todos sus ítems están listos, y queda registrado en el historial con el detalle de lo cobrado.

## Requisitos

- [Node.js](https://nodejs.org/en/download/) en una versión estable (LTS). En Windows, usar el instalador de la pestaña *Prebuilt Installer*; en macOS o Linux, *Package Manager* con NVM.
- npm (se instala junto con Node.js).

## Instalación

Desde la carpeta del proyecto:

```bash
# instala las dependencias definidas en package.json
npm i
```

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run lint` | Revisa el código de `src/` con ESLint |
| `npm run lint-fix` | Revisa el código y corrige automáticamente lo que se pueda |
| `npm run build` | Limpia `dist/`, ejecuta el lint y compila TypeScript a `dist/` |
| `npm test` | Ejecuta el build y luego todas las pruebas unitarias con Jest, con reporte de cobertura |

El reporte de cobertura queda en `coverage/`. Para verlo en detalle, abrir `coverage/lcov-report/index.html` en el navegador. El enunciado exige superar el 80 %.

## Estructura del proyecto

```
📂 src/            código fuente (una clase por archivo)
   📂 constants/   constantes numéricas (evitan números mágicos)
   📂 error/       errores propios del dominio
📂 tests/          pruebas unitarias (*.test.ts)
📂 diagrams/       diagramas UML en PlantUML
📄 Enunciado.pdf   enunciado del trabajo práctico
```

## Diseño

### Diagramas

| Archivo | Contenido |
| --- | --- |
| `diagrams/clases.puml` | Diagrama de clases: menú, pedidos, estados, cocina, pago y facturación (las clases de error, en `src/error/`, no se incluyen para que el diagrama sea legible) |
| `diagrams/secuencia_confirmar_pedido.puml` | Secuencia: confirmar un pedido y distribuir sus ítems a las estaciones |
| `diagrams/secuencia_facturar_pedido.puml` | Secuencia: facturar un pedido y guardarlo en el historial |

Para verlos en VS Code, instalar la extensión [PlantUML](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml) (requiere Java), abrir el archivo y presionar **Alt+D**.

### Patrones utilizados

| Patrón | Dónde | Para qué |
| --- | --- | --- |
| **State** | `IEstadoPedido` (en construcción → confirmado → listo → facturado) | Cada estado decide qué se puede hacer con el pedido (modificarlo, confirmarlo, facturarlo) |
| **State** | `IEstadoItem` (pendiente → en preparación → listo) | Un ítem en preparación o listo no se puede modificar ni cancelar |
| **Strategy** | `IEstrategiaPrecioCombo` | Calcular el precio del combo con descuento porcentual o precio fijo |
| **Strategy** | `IDescuento` | Descuento por efectivo o por día especial; agregar uno nuevo es crear una clase |
| **Composite** | `ItemPedido` → `ItemPedidoSimple` / `ItemPedidoCombo` | Un combo se trata como un ítem, pero cada producto va a su estación con su propio estado |
| **Factory Method** | `Comida.crearItemPedido()` | Cada producto o combo crea el ítem de pedido que le corresponde, sin preguntar el tipo |

### Decisiones de diseño

- **El producto del menú no tiene estado; el ítem del pedido sí.** `Producto` y `Combo` son el catálogo. Al agregarlos a un pedido se crea un `ItemPedido` con su cantidad y su estado propio, así dos pedidos con el mismo producto no comparten estado.
- **Un combo llega a todas sus estaciones.** `ItemPedidoCombo` crea un `ItemPedidoSimple` por cada producto del combo, y cada uno se encola en su estación. El combo está listo cuando todos sus componentes lo están.
- **Cola propia por estación.** Cada `Estacion` usa una `Cola` (implementada con `MyNode`) para respetar el orden de llegada.
- **Deshacer con un array de modificaciones.** El pedido anota cada cambio (agregar o quitar, con el ítem y su posición) en un array, y `deshacerUltimoItem()` revierte la última anotación.
- **El envío no recibe descuento.** `Caja` calcula el descuento sobre `calcularSubtotal()` (solo productos), y `PedidoDelivery` suma el envío en `calcularTotal()`.
- **La factura es una foto del cobro.** `Factura` copia descripciones, cantidades e importes, así el historial no cambia si después se modifican los precios del menú.

## Requerimientos funcionales

| # | Requerimiento | Dónde se resuelve |
| --- | --- | --- |
| 1 | Registrar pedidos en las tres modalidades | `PedidoSalon`, `PedidoParaLlevar`, `PedidoDelivery` |
| 2 | Agregar y quitar productos o combos en construcción | `Pedido.agregarProducto()`, `Pedido.quitarItem()` |
| 3 | Deshacer la última modificación | `IPedidoModificable.deshacerUltimoItem()` y el array `Pedido.modificaciones` |
| 4 | Confirmar y distribuir ítems a las estaciones | `Pedido.confirmar()`, `ItemPedido.enviarACocina()` |
| 5 | Cada estación procesa en orden de llegada | `Estacion.procesarSiguiente()` con `Cola` |
| 6 | No modificar ni cancelar ítems en preparación | `IEstadoItem.validarModificacion()` |
| 7 | No facturar hasta que todos los ítems estén listos | `Pedido.puedeFacturarse()`, `Caja.facturar()` |
| 8 | Precio total con productos y combos | `Pedido.calcularSubtotal()`, `Pedido.calcularTotal()`, `Combo.getPrecio()` |
| 9 | Total a cobrar según medio de pago y descuento más beneficioso | `Caja.calcularTotalACobrar()`, `IDescuento`, `IMedioPago` |
| 10 | Historial de pedidos finalizados con el detalle cobrado | `Caja.getHistorial()`, `Factura`, `LineaFactura` |

## Herramientas recomendadas (VS Code)

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
* [PlantUML](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)
* [Test Adapter Converter](https://marketplace.visualstudio.com/items?itemName=ms-vscode.test-adapter-converter)
* [Test Explorer UI](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-test-explorer)

# Reglas de estilo de código (ESLint)

El proyecto incluye una configuración de ESLint (`eslint.config.js`) que estandariza el código. Para verificarla ejecutar:

```bash
# revisa el código en src/ y reporta errores
user@host:~$ npm run lint

# revisa el código y corrige automáticamente lo que se pueda
user@host:~$ npm run lint-fix
```

A continuación se muestran ejemplos de cada regla configurada.

## Nombres de clases, interfaces y tipos (PascalCase)

| ❌ Incorrecto        | ✅ Correcto          |
| ------------------- | ------------------- |
| `class persona { }` | `class Persona { }` |

## Nombres de constantes globales (UPPER_CASE)

| ❌ Incorrecto             | ✅ Correcto                |
| ------------------------ | ------------------------- |
| `const maxIntentos = 3;` | `const MAX_INTENTOS = 3;` |

## Nombres de variables y funciones (camelCase)

| ❌ Incorrecto                  | ✅ Correcto                   |
| ----------------------------- | ---------------------------- |
| `let Nombre_Usuario = "Ana";` | `let nombreUsuario = "Ana";` |

## Nombres de métodos de clase (camelCase)

| ❌ Incorrecto                 | ✅ Correcto                   |
| ---------------------------- | ---------------------------- |
| `public Saludar(): void { }` | `public saludar(): void { }` |

## Longitud mínima de los nombres (mínimo 4 caracteres)

Se exceptúan los contadores de bucles `i`, `j` y `k`.

| ❌ Incorrecto    | ✅ Correcto          |
| --------------- | ------------------- |
| `const n = 10;` | `const total = 10;` |

## Números mágicos

Los números "sueltos" dentro de una expresión deben reemplazarse por una constante con nombre (los índices de arreglo, como `arr[0]`, están permitidos).

| ❌ Incorrecto                       | ✅ Correcto                                                                 |
| ---------------------------------- | -------------------------------------------------------------------------- |
| `for (let i = 0; i < 10; i++) { }` | `const MAX_INTENTOS = 10;`<br>`for (let i = 0; i < MAX_INTENTOS; i++) { }` |

## Longitud máxima de un método (40 líneas)

| ❌ Incorrecto                                                                                                     | ✅ Correcto                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `public calcular(): number {`<br>`  // ... 45 líneas de código`<br>`  // todo mezclado en un solo método`<br>`}` | `public calcular(): number {`<br>`  const datos = this.obtenerDatos();`<br>`  return this.procesar(datos);`<br>`}` |

## Longitud máxima de línea (120 caracteres)

| ❌ Incorrecto                                                                                                                 | ✅ Correcto                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `const mensaje = "un texto larguísimo que supera ampliamente los 120 caracteres permitidos en una sola línea de código...";` | `const mensaje =`<br>`  "un texto largo " +`<br>`  "separado en varias líneas.";` |

## Llaves obligatorias en `if`/`else`/`for`/`while`

| ❌ Incorrecto                       | ✅ Correcto                                         |
| ---------------------------------- | -------------------------------------------------- |
| `if (activo) console.log("Hola");` | `if (activo) {`<br>`  console.log("Hola");`<br>`}` |

## Espaciado en estructuras de control

Espacio después de la palabra clave (`if`, `for`, `while`) y antes del `(`; sin espacios pegados a `(` o `)`; espacio antes de `{`.

| ❌ Incorrecto                                     | ✅ Correcto                                         |
| ------------------------------------------------ | -------------------------------------------------- |
| `if(activo){`<br>`  console.log("Hola");`<br>`}` | `if (activo) {`<br>`  console.log("Hola");`<br>`}` |

## Modificadores de acceso explícitos

Todo campo o método de una clase debe declarar `public`, `private` o `protected`.

| ❌ Incorrecto                                    | ✅ Correcto                                              |
| ----------------------------------------------- | ------------------------------------------------------- |
| `class Persona {`<br>`  nombre: string;`<br>`}` | `class Persona {`<br>`  private nombre: string;`<br>`}` |

## Métodos que no usan `this`

Si un método no usa `this`, probablemente debería ser `static`.

| ❌ Incorrecto                                                                                                                             | ✅ Correcto                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `class Calculadora {`<br>`  public sumar(primero: number, segundo: number): number {`<br>`    return primero + segundo;`<br>`  }`<br>`}` | `class Calculadora {`<br>`  public static sumar(primero: number, segundo: number): number {`<br>`    return primero + segundo;`<br>`  }`<br>`}` |

## Una sola clase por archivo

| ❌ Incorrecto                                              | ✅ Correcto                                                                     |
| --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `// animal.ts`<br>`class Animal { }`<br>`class Perro { }` | `// animal.ts`<br>`class Animal { }`<br><br>`// perro.ts`<br>`class Perro { }` |

## Sin métodos o funciones vacías

| ❌ Incorrecto                    | ✅ Correcto                                                       |
| ------------------------------- | ---------------------------------------------------------------- |
| `public constructor() {`<br>`}` | `public constructor() {`<br>`  this.inicializado = true;`<br>`}` |

## Tipo de retorno explícito

| ❌ Incorrecto                                                 | ✅ Correcto                                                           |
| ------------------------------------------------------------ | -------------------------------------------------------------------- |
| `public obtenerNombre() {`<br>`  return this.nombre;`<br>`}` | `public obtenerNombre(): string {`<br>`  return this.nombre;`<br>`}` |
