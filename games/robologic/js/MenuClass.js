// Menú principal del juego.
// Cada opción tiene una etiqueta y una acción; el menú no sabe qué hay detrás,
// solo ejecuta la acción de la opción elegida. Es también la base de otros
// menús (por ejemplo, la lista de niveles).
class MenuClass extends ScreenClass {
  constructor(host, config = {}) {
    super(host);
    this.canvas = host.getCanvas();
    this.title = config.title || 'Robologic';
    this.items = config.items || [
      { label: 'Levels', action: () => this.openLevels() },
    ];
    this.selected = 0;
  }

  // Abre la lista de niveles y queda esperando para volver a mostrarse.
  openLevels() {
    this.open(new LevelsClass(this.host), () => { this.target = null; });
  }

  handleAction(key, isPressed) {
    if (!isPressed) return;

    if (key === 'ArrowUp') this.move(-1);
    else if (key === 'ArrowDown') this.move(1);
    else if (key === 'Enter') this.select(this.selected);
    else if (key === 'Escape') this.back();
    else if (key === 'mouseLeft') this.click(this.host.getMouse());
  }

  move(step) {
    if (this.items.length === 0) return;
    this.selected = (this.selected + step + this.items.length) % this.items.length;
  }

  select(index) {
    const item = this.items[index];
    if (item && typeof item.action === 'function') item.action();
  }

  click(mouse) {
    const index = this.itemAt(mouse.x, mouse.y);
    if (index === -1) return;
    this.selected = index;
    this.select(index);
  }

  // Índice de la opción que contiene el punto (x, y), o -1 si ninguna.
  itemAt(x, y) {
    const { rects } = this.layout();
    for (let i = 0; i < rects.length; i++) {
      const rect = rects[i];
      if (x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height) {
        return i;
      }
    }
    return -1;
  }

  // Geometría del menú. Se usa igual para dibujar y para detectar clics.
  layout() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const itemHeight = Math.max(32, Math.min(64, height * 0.09));
    const itemWidth = Math.min(width * 0.8, 420);
    const x = (width - itemWidth) / 2;
    const startY = height * 0.38;
    const gap = itemHeight * 0.25;

    const rects = this.items.map((item, i) => ({
      x,
      y: startY + i * (itemHeight + gap),
      width: itemWidth,
      height: itemHeight,
    }));

    return {
      titleX: width / 2,
      titleY: height * 0.22,
      titleSize: Math.max(20, Math.min(48, height * 0.07)),
      labelSize: Math.max(14, Math.min(28, itemHeight * 0.5)),
      rects,
    };
  }

  draw() {
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const layout = this.layout();
    const mouse = this.host.getMouse();
    const hovered = this.itemAt(mouse.x, mouse.y);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#fff';
    ctx.font = `bold ${Math.round(layout.titleSize)}px sans-serif`;
    ctx.fillText(this.title, layout.titleX, layout.titleY);

    this.items.forEach((item, i) => {
      const rect = layout.rects[i];
      const isSelected = i === this.selected;
      const isHovered = i === hovered;

      ctx.fillStyle = isSelected ? '#1f6f4a' : (isHovered ? '#2b2b2b' : '#1b1b1b');
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

      ctx.strokeStyle = isSelected ? '#5fd39a' : '#555';
      ctx.lineWidth = 2;
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

      ctx.fillStyle = '#fff';
      ctx.font = `${Math.round(layout.labelSize)}px sans-serif`;
      ctx.fillText(item.label, rect.x + rect.width / 2, rect.y + rect.height / 2);
    });

    const hint = this.onBack
      ? '↑/↓: mover   Enter/clic: elegir   Esc: volver'
      : '↑/↓: mover   Enter/clic: elegir';
    ctx.fillStyle = '#777';
    ctx.font = '14px sans-serif';
    ctx.fillText(hint, this.canvas.width / 2, this.canvas.height - 24);
  }
}
