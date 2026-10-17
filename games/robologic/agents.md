# Robologic - agents.md

## Objetivo del juego
Juego tipo puzzle. El usuario recibe un escenario con un objetivo: debe usar los items dados y generar una salida igual a la esperada para vencer el escenario.

## Escenario
Cuadrícula fija (ej. 4x4, 6x6, 3x2) donde el usuario coloca los items.

## Ítems
- **Robot**: genera la salida.
- **Band**: indica hacia dónde se dirige el robot.
- **Stamper**: coloca una etiqueta de color sobre el robot.
- **Switch**: determina el camino del robot según el color de la etiqueta.
- **Pipe**: tubo de cuatro lados por el que el robot puede pasar sin cambiar trayectoria.
- **Junker**: recibe un robot desechado.
- **Exit**: recibe un robot aceptado.

## Controles
- **Q / E**: selecciona item Switch.
- **Z**: selecciona item Band.
- **X**: selecciona item Pipe.
- **C**: selecciona item Junker.
- **V**: selecciona item Exit.
- **W / S / D / A**: rota el item (arriba / abajo / derecha / izquierda).
- **Flechas**: mueve el item sobre el escenario.
- **Enter**: fija el item en el escenario.
- **Click izquierdo**: selecciona o fija el item.

## Interacciones entre ítems
El robot recorre los ítems colocados hasta llegar al Junker o al Exit:
- **Band**: indica dirección (arriba, abajo, izquierda, derecha).
- **Stamper**: pone sticker de color (rojo o azul) sobre el robot y marca la continuación del camino.
- **Switch**: quita la etiqueta de color y define la salida según el color (azul, rojo o sin etiqueta).
- **Pipe**: deja pasar el robot por el mismo camino por el que entró (entra izquierda → sale derecha; entra arriba → sale abajo).
- **Junker**: finaliza el recorrido, robot rechazado.
- **Exit**: finaliza el recorrido, robot aceptado.

## Reglas del juego
- El jugador debe agregar un robot (obligatorio) y construir un camino hasta una salida (Exit o Junker).
- Debe haber al menos un Exit.
- Exit y Junker se pueden repetir varias veces.
- Victoria: el robot llega con las marcas de salida esperadas para el escenario (ej. sticker azul y rojo en ese orden).

## Tecnología
- HTML5 `<canvas>` para el renderizado.
- JavaScript moderno (ES6+) para la lógica.
- Sin librerías externas.

## Arquitectura

- Toda la lógica del juego está organizada en objetos.
- Los archivos JavaScript del juego viven en `js/`. Los datos de los niveles viven en `js/levels.js`.
- `AppClass` (`js/app.js`, excepción: la clase de la app se agrupa aquí) es el cascarón de la aplicación: solo se ocupa de los dispositivos de entrada (teclado, mouse y toques) y de delegar. Mantiene el estado (teclas presionadas, botones y posición del mouse) y delega en su objeto actual `this.target`, que de entrada es `GameClass`. En cada frame invoca a `this.target.run()`. Expone `getCanvas()`, `getMouse()` y `setTarget(target)`; no contiene lógica de juego ni de navegación.
- `ScreenClass` (`js/ScreenClass.js`) es la base de todas las pantallas. Cada pantalla puede delegar en otra (`target`): mientras exista, sus `actions` y su `run` pasan a ella. `open(child, onBack)` encadena la pantalla siguiente y `back()` avisa a la pantalla que la abrió para que vuelva a mostrarse.
- `GameClass` (`js/GameClass.js`) representa el juego entero (menús, escenario y objetos) y es el orquestador. Carga los niveles (`LEVELS` → `LevelClass`), arranca delegando en `MenuClass` y expone a las pantallas `getLevels()`, `getCanvas()` y `getMouse()`.
- `MenuClass` (`js/MenuClass.js`) es el menú principal: opciones con etiqueta y acción, navegación con ↑/↓, `Enter` y clic/toque, y resaltado por hover. La opción **Levels** abre `LevelsClass`.
- `LevelsClass` (`js/LevelsClass.js`) extiende `MenuClass` y arma las opciones con los niveles disponibles; al elegir uno abre `BoardClass`.
- `BoardClass` (`js/BoardClass.js`) es el escenario: dibuja la cuadrícula del nivel y con `Esc` vuelve a la lista.
- `LevelClass` (`js/LevelClass.js`) representa un nivel ya cargado (tamaño, string de entrada y strings de verificación).
- Cada objeto sabe cómo dibujarse. Los ítems reciben el canvas en su constructor y lo usan en `draw`.
- No todo objeto es dibujable: los objetos de lógica pura no se representan.
- Las clases usan UpperCamelCase y terminan con el sufijo `Class` (ej. `AppClass`, `GameClass`, `RobotClass`).

## Pantallas y navegación

La aplicación es una cadena de pantallas. `AppClass` siempre delega en `GameClass`, y cada pantalla delega en la siguiente:

`GameClass` → `MenuClass` (menú principal, opción **Levels**) → `LevelsClass` (lista de niveles) → `BoardClass` (escenario del nivel).

- **↑ / ↓**: mueve la selección.
- **Enter** o **clic izquierdo**: elige la opción.
- **Esc**: cada pantalla se cierra y la anterior vuelve a mostrarse (en el escenario, vuelve a la lista de niveles).
- Un **toque** en celular se trata como clic izquierdo.
- La opción bajo el cursor se resalta en cada frame leyendo `getMouse()`.

## Contrato del target

Una pantalla delega en su `target` cuando existe; por eso un objeto solo puede ser target (o pantalla) si implementa:

- `actions(key, isPressed)`: recibe la tecla presionada (y si está presionada) y procesa la acción correspondiente.
- `run()`: ejecuta el paso del ciclo; la pantalla contenedora lo invoca en cada frame.

Notas:
- `AppClass.actions(key, isPressed)` recibe el input y lo delega a su target (`GameClass`).
- El clic izquierdo llega como `actions('mouseLeft', true)`; para saber dónde se hizo, la pantalla lee `this.host.getMouse()` (`{ left, right, x, y }`, en coordenadas del canvas). Un toque en celular produce el mismo par de acciones.
- Las pantallas reciben un `host` (en la práctica, `GameClass`) para obtener el canvas, el mouse y los niveles.
- Al abrir una pantalla con teclas presionadas, la nueva pantalla no recibe el evento de presión inicial: si necesita el estado mantenido, debe leerlo del `host`.

## Datos de niveles

Los niveles se definen en `js/levels.js` como `const LEVELS = [...]`, con estructura JSON:

- `size`: tamaño del escenario (`{ width, height }`).
- `input`: string de entrada del escenario.
- `verification`: uno o más strings de verificación (array).

`LevelClass` (`js/LevelClass.js`) representa un nivel ya cargado. El formato interno de `input` y `verification` todavía no está definido: por ahora se guardan tal cual y `BoardClass` solo dibuja la cuadrícula vacía.

## Cómo probarlo
Abrir `games/robologic/index.html` directamente en el navegador o servirlo con cualquier servidor estático.

## Pendientes
- Definir el formato de los strings de entrada y verificación e interpretarlos al dibujar el escenario.
- Implementar lógica de colocación, rotación y movimiento de ítems.
- Implementar simulación del recorrido del robot y condiciones de victoria/derrota.
- Implementar controles táctiles del juego (el menú ya responde a toques).
- Ajustar canvas para móviles y PC (por ejemplo, escalado para pantallas de alta densidad).
