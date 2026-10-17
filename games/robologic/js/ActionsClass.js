// Botonera de acciones del escenario: orientación del ítem (equivale a W/S/D/A),
// confirmar, quitar, ejecutar y reiniciar. Delega cada acción en el tablero.
class ActionsClass {
  constructor(board) {
    this.board = board;
    this.defs = [
      { id: 'up', label: '↑', keys: ['w'] },
      { id: 'left', label: '←', keys: ['a'] },
      { id: 'down', label: '↓', keys: ['s'] },
      { id: 'right', label: '→', keys: ['d'] },
      { id: 'confirm', label: 'OK', keys: ['enter'] },
      { id: 'remove', label: 'X', keys: [] },
      { id: 'run', label: '▶', keys: [] },
      { id: 'reset', label: '⟲', keys: [] },
    ];
    this.buttons = this.defs.map((def) => new ButtonClass(
      { x: 0, y: 0, width: 0, height: 0 },
      { label: def.label, action: () => this.board.doAction(def.id) },
    ));
  }

  // Ubica los botones en la región de acciones y los devuelve.
  layout() {
    const region = this.board.layout.actionsRegion();
    const columns = this.board.layout.isWide() ? 2 : 4;
    const rects = this.board.layout.grid(region, this.buttons.length, columns, 6);
    this.buttons.forEach((button, index) => { button.rect = rects[index]; });
    return this.buttons;
  }

  // Ejecuta la acción de la tecla. Devuelve true si la tecla pertenecía a esta barra.
  key(key) {
    const pressed = String(key).toLowerCase();
    const def = this.defs.find((d) => d.keys.includes(pressed));
    if (!def) return false;
    this.board.doAction(def.id);
    return true;
  }

  // Ejecuta el botón bajo el cursor. Devuelve true si había uno.
  click(x, y) {
    const button = this.layout().find((b) => b.contains(x, y));
    if (!button) return false;
    button.click();
    return true;
  }

  draw(ctx) {
    const mouse = this.board.host.getMouse();
    this.layout().forEach((button, index) => {
      button.hovered = button.contains(mouse.x, mouse.y);
      button.draw(ctx);
    });
  }
}
