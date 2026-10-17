# AGENTS.md

## Repositorio
Sitio web estático de videojuegos. No hay backend, base de datos ni servicios externos. No existe `package.json` ni runner de pruebas: para verificar un juego, abre su `index.html` directamente en el navegador o sírvelo con cualquier servidor estático.

## Estructura
- `index.html` (raíz): documento principal con enlaces a cada juego.
- `games/<juego>/`: una carpeta por videojuego, autocontenida. Cada una contiene:
  - `agents.md`: base para que un agente conozca el juego (objetivo, controles, tecnología, cómo probarlo, pendientes).
  - `index.html`: punto de entrada del juego.
  - `style.css`: presentación del juego.
  - `js/`: todos los archivos JavaScript del juego (`app.js` con la `AppClass`, `GameClass.js` y los `*Class.js`).
  - `assets/`: imágenes, sonidos y otros archivos del juego (opcional, solo si el juego los necesita).
- Mantén separados el contenido (HTML), la presentación (CSS) y la lógica (JavaScript).
- Crea solo los archivos que necesites; no dejes archivos ni carpetas vacías.

## Arquitectura del código
Todo el código de un juego está organizado en objetos:

- Todo lo que se ejecuta dentro de un juego es un objeto (lógica de JavaScript).
- Cada objeto sabe cómo dibujarse.
- No todo objeto es dibujable: los objetos de lógica pueden existir sin representación.
- Un objeto puede crear otros objetos.

**Entrada y delegación**

- `app.js` es el objeto de la aplicación (`AppClass`) y es un cascarón: solo se ocupa de los dispositivos de entrada (teclado, mouse, toques) y de delegar. Recibe todas las acciones, registra qué tecla se presiona y si se mantiene presionada (incluyendo los botones y la posición del mouse) y las delega a su objeto actual. El estado se evalúa en cada ciclo de render. (Excepción: la clase de la app se agrupa en `app.js`; el resto de clases cumple un archivo por clase.)
- `AppClass` no contiene lógica de juego ni de navegación. Delega siempre en su objeto actual (`this.target`), que de entrada es el objeto raíz del juego, y puede cambiarse con `AppClass.setTarget(objeto)`. Expone además `getCanvas()` y `getMouse()`.
- El objeto al que se delega (el target) debe exponer dos métodos: `actions(key, isPressed)`, que recibe la tecla presionada (y si está presionada) y procesa la acción; y `run()`, que ejecuta el paso del ciclo en cada frame. Un objeto solo puede ser target si implementa ambos.
- `AppClass.getCanvas()` devuelve el canvas para que cualquier objeto pueda dibujar en él, y `AppClass.getMouse()` devuelve el estado del mouse (botones y posición en coordenadas del canvas). Como el canvas puede escalarse por CSS, la app traduce las coordenadas del cliente antes de exponerlas. Solo los objetos que deban solicitar la app (dibujar, leer el mouse) necesitan acceso a `app.js`.
- La navegación entre pantallas (menú, lista de niveles, juego) vive en el objeto raíz del juego, no en `AppClass`. Un patrón habitual es una cadena de pantallas: cada pantalla delega en la siguiente (`target`) y puede volver a la anterior (la hija avisa a la que la abrió para que se muestre otra vez).
- Al cambiar de pantalla con teclas presionadas, la nueva pantalla no recibe el evento de presión inicial: si necesita conocer el estado mantenido, debe leerlo de la aplicación o del objeto que la contiene.

**Convenciones**

- El código debe ser legible y fácil de entender.
- Las clases usan UpperCamelCase y terminan con el sufijo `Class` (ej. `AppClass`, `GameClass`, `RobotClass`).
- Cada clase vive en un archivo propio con el mismo nombre (ej. `GameClass.js`, `RobotClass.js`). Excepción: la clase de la aplicación (`AppClass`) vive en `app.js`.

## Reglas de cada juego
- Debe jugarse en navegadores de PC y celular.
- Prioriza `<canvas>` para el renderizado.
- Debe poder insertarse dentro de un contenedor (div, span, iframe, anchor, etc.).
- Usa capacidades nativas del navegador siempre que sea posible.
- Librerías externas solo si se justifica la necesidad antes de agregarlas.

## Flujo para agregar un juego nuevo
1. Crea la carpeta `games/<juego>/`.
2. Escribe su `agents.md` con las bases del juego.
3. Implementa `index.html`, `style.css`, `app.js`, `GameClass.js` y los archivos de las clases del juego (ej. `RobotClass.js`).
4. Prueba en navegador de PC y en celular.
5. Agrega el enlace al juego desde el `index.html` raíz.
