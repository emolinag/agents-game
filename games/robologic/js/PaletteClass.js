// Paleta de ítems: una botonera con un botón por tipo de ítem. Mantiene cuál
// está seleccionado y lo resalta. Se puede elegir con clic/toque o con la tecla
// indicada en cada ítem.
class PaletteClass {
  constructor(board) {
    this.board = board;
    this.selected = null;
    this.defs = [
      { id: 'robot', name: 'Robot', color: '#0f0', keys: ['r'] },
      { id: 'band', name: 'Band', color: '#f0f', keys: ['z'] },
      { id: 'stamper', name: 'Stamper', color: '#ff0', keys: ['t'] },
      { id: 'switchQ', name: 'Switch', color: '#888', keys: ['q'] },
      { id: 'switchE', name: 'Switch', color: '#888', keys: ['e'] },
      { id: 'pipe', name: 'Pipe', color: '#aaa', keys: ['x'] },
      { id: 'junker', name: 'Junker', color: '#f00', keys: ['c'] },
      { id: 'exit', name: 'Exit', color: '#0ff', keys: ['v'] },
    ];
    this.buttons = this.defs.map((def) => new ButtonClass(
      { x: 0, y: 0, width: 0, height: 0 },
      { label: def.name, color: def.color, action: () => this.select(def.id) },
    ));
  }

  // Ubica los botones en la región de la paleta y los devuelve.
  layout() {
    const region = this.board.layout.paletteRegion();
    const columns = this.board.layout.isWide() ? 2 : 4;
    const rects = this.board.layout.grid(region, this.buttons.length, columns, 6);
    this.buttons.forEach((button, index) => { button.rect = rects[index]; });
    return this.buttons;
  }

  select(id) {
    this.selected = id;
  }

  // Selecciona por tecla. Devuelve true si la tecla pertenecía a la paleta.
  key(key) {
    const pressed = String(key).toLowerCase();
    const def = this.defs.find((d) => d.keys.includes(pressed));
    if (!def) return false;
    this.select(def.id);
    return true;
  }

  // Selecciona el botón bajo el cursor. Devuelve true si había uno.
  click(x, y) {
    const button = this.layout().find((b) => b.contains(x, y));
    if (!button) return false;
    button.click();
    return true;
  }

  draw(ctx) {
    const mouse = this.board.host.getMouse();
    this.layout().forEach((button, index) => {
      button.selected = this.defs[index].id === this.selected;
      button.hovered = button.contains(mouse.x, mouse.y);
      button.draw(ctx);
    });
  }
}
