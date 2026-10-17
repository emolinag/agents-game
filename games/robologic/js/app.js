class AppClass {
  constructor(canvas) {
    this.canvas = canvas;

    // Estado del input: qué teclas y botones se mantienen presionados
    // y dónde está el mouse (en coordenadas del canvas).
    this.keysPressed = new Set();
    this.mouse = { left: false, right: false, x: 0, y: 0 };

    this.setupInput();
    this.resizeCanvas();

    // AppClass solo se ocupa de la entrada y de delegar: de entrada,
    // el juego entero.
    this.target = new GameClass(this);
    this.render();
  }

  // Devuelve el canvas.
  getCanvas() {
    return this.canvas;
  }

  // Devuelve el estado del mouse (botones y posición en el canvas).
  getMouse() {
    return this.mouse;
  }

  // Setea el objeto que recibe las acciones y dibuja.
  setTarget(target) {
    this.target = target;
  }

  setupInput() {
    window.addEventListener('keydown', (event) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(event.key)) {
        event.preventDefault();
      }
      this.keysPressed.add(event.key);
      this.actions(event.key, true);
    });

    window.addEventListener('keyup', (event) => {
      this.keysPressed.delete(event.key);
      this.actions(event.key, false);
    });

    window.addEventListener('mousemove', (event) => {
      this.updateMouse(event.clientX, event.clientY);
    });

    window.addEventListener('mousedown', (event) => {
      if (event.button === 0) this.mouse.left = true;
      if (event.button === 2) this.mouse.right = true;
      this.updateMouse(event.clientX, event.clientY);
      const key = event.button === 0 ? 'mouseLeft' : 'mouseRight';
      this.actions(key, true);
    });

    window.addEventListener('mouseup', (event) => {
      if (event.button === 0) this.mouse.left = false;
      if (event.button === 2) this.mouse.right = false;
      const key = event.button === 0 ? 'mouseLeft' : 'mouseRight';
      this.actions(key, false);
    });

    // En celular un toque se trata como un clic izquierdo.
    this.canvas.addEventListener('touchstart', (event) => {
      const touch = event.changedTouches[0];
      if (!touch) return;
      event.preventDefault();
      this.updateMouse(touch.clientX, touch.clientY);
      this.actions('mouseLeft', true);
      this.actions('mouseLeft', false);
    }, { passive: false });

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  // Guarda la posición del mouse en coordenadas del canvas,
  // contemplando el escalado que aplica el CSS.
  updateMouse(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    this.mouse.x = (clientX - rect.left) * (this.canvas.width / rect.width);
    this.mouse.y = (clientY - rect.top) * (this.canvas.height / rect.height);
  }

  resizeCanvas() {
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
  }

  // AppClass recibe la acción y la delega al objeto target,
  // que expone el método `actions` y procesa la tecla recibida.
  actions(key, isPressed) {
    this.target.actions(key, isPressed);
  }

  render() {
    this.target.run();
    requestAnimationFrame(() => this.render());
  }
}

new AppClass(document.getElementById('gameCanvas'));
