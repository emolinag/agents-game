# Robologic - agents.md

## Objetivo del juego
Este es un juego tipo puzzle. Al usuario se le da por escenario un objetivo a cumplir, debe usar los items dados y generar una salida igual a la dada para vencer el escenario.

# Escenario
El escenario es una cuadricula fija (4x4, 6x6, 3x2, etc) en el que el usuario debe colocar ciertos items.

# Descripción de items
- Robot : Es el que da la salida.
- Band : Indica por dónde se dirige el Robot
- Stamper : Coloca sobre el robot una etiqueta de color
- Switch : Determina que camino debe tomar el robot según el color
- Pipe : Un tubo de cuatro lados por el cuál el robot puede pasar
- Junker : Recibe un robot deshechado
- Exit : Recibe un robot aceptado


## Controles
- Q : Selecciona item Switch
- E : Selecciona item Switch
- Z : Selecciona item Band
- x : Selecciona item Pipe
- Z : Selecciona item Band
- C : Selecciona item Junker
- V : Selecciona item Exit
- W : Rota el item para que el robot continue hacia arriba
- S : Rota el item para que el robot continue hacia abajo
- D : Rota el item para que el robot continue hacia derecha
- A : Rota el item para que el robot continue hacia izquirda
- Flecha Arriba : Mueve el item sobre el escenario arriba de la ubicación actual
- Flecha Abajo : Mueve el item sobre el escenario abajo de la ubicación actual
- Flecha Izquierda : Mueve el item sobre el escenario izquierda de la ubicación actual
- Flecha Derecha : Mueve el item sobre el escenario derecha de la ubicación actual
- Enter : fija el item en el escenario
- Click izquierdo : Selecciona o fija el item sobre el escenario


# Descripcion general de las interacciones entre los items
El robot pasa a travéz de los diferentes items que pone el usuario hasta el Junker o el Exit. Cada item tiene una iteración sobre el robot de la siguiente forma
- Band: Recibe un robot y señala hacia dónde debe dirigirse(arriba, abajo, izquierda, derecha)
- Stamper : Pone un sticker de color(rojo o azul) sobre el robot y le indica por donde debe continuar el camino el robot
- Switch : Quita una etiqueta de color(rojo o azul) del robto e indica por dónde debe continuar según el color. En sí, el switch indica tres salidas diferentes. Una para el color azul, otro para el color rojo y otra en caso de que no tenga etiquetas.
- Pipe : Deja continuar el robot por el mismo camino por el que venía y no afecta su trayectoria (Si el robot entra por izquiera, sale por derecha y viscversa, si entra por arriba continua abajo y visceversa )
- Junker : Hasta aquí llega el robot e indica que fue rechazado
- Exot : Hasta aquí llega el robot e indica que fue aceptado

# Reglas del juego
El jugador debe agregar un robot(obligatorio) y contruir un camino hasta una salida (Exit o Junker). Debe haber por lo menos Un Exit. Tanto el exit cómo el junker se pueden repetir varias veces.
Se considera victoria cuando el robot tiene las marcas esperadas de SALIDA que se espera para el escenario. Por ejemplo : Si en el escenario se indica que la salida tenga un sticker azul y otro rojo, debe salir en ese mismo orden.


## Tecnología
- HTML5 `<canvas>` para el renderizado.
- JavaScript moderno (ES6+) para la lógica.
- Sin librerías externas.

## Cómo probarlo
Abrir `games/robologic/index.html` directamente en el navegador o servirlo con cualquier servidor estático.

## Pendientes
- Definir género y mecánica del juego.
- Implementar bucle de render con `requestAnimationFrame`.
- Ajustar canvas para móviles y PC.
- Agregar controles de entrada.
