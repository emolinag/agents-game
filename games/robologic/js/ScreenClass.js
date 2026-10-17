// Base de las pantallas del juego.
// Cada pantalla puede delegar en otra (`target`): mientras exista, las acciones
// y el dibujo pasan a ella. `open` encadena la pantalla siguiente y `back` avisa
// a la pantalla que la abrió para que vuelva a mostrarse.
class ScreenClass {
  constructor(host) {
    this.host = host;
    this.target = null;
    this.onBack = null;
  }

  // Delega en la pantalla abierta; si no hay, procesa la acción.
  actions(key, isPressed) {
    if (this.target) {
      this.target.actions(key, isPressed);
      return;
    }
    this.handleAction(key, isPressed);
  }

  // Por defecto, `Esc` vuelve a la pantalla anterior.
  handleAction(key, isPressed) {
    if (key === 'Escape' && isPressed) this.back();
  }

  // Dibuja la pantalla abierta; si no hay, se dibuja a sí misma.
  run() {
    if (this.target) {
      this.target.run();
      return;
    }
    this.draw();
  }

  draw() {}

  // Abre una pantalla hija. `onBack` es lo que debe hacer la hija para volver.
  open(child, onBack) {
    child.onBack = onBack || null;
    this.target = child;
  }

  // Vuelve a la pantalla que abrió esta.
  back() {
    if (typeof this.onBack === 'function') this.onBack();
  }
}
