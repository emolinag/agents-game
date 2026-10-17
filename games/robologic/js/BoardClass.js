// Escenario de un nivel. Se apoya en `LayoutClass` para repartir la pantalla en
// cabecera, tablero y botonera (paleta de ítems + acciones), y dibuja la
// cuadrícula dentro de la región del tablero.
// Con `Esc` o el botón Volver vuelve a la lista de niveles.
class BoardClass extends ScreenClass {
  constructor(host, level) {
    super(host);
    this.canvas = host.getCanvas();
    this.level = level;
    this.layout = new LayoutClass(this.canvas);
    this.palette = new PaletteClass(this);
    this.actionBar = new ActionsClass(this);
    this.backButton = new ButtonClass(
      { x: 0, y: 0, width: 0, height: 0 },
      { label: 'Volver', action: () => this.back() },
    );
  }

  handleAction(key, isPressed) {
    if (!isPressed) return;

    if (key === 'Escape') {
      this.back();
      return;
    }

    if (key === 'mouseLeft') {
      this.handleClick(this.host.getMouse());
      return;
    }

    // Teclas de la botonera: paleta (elegir ítem) y acciones (rotar, confirmar...).
    if (this.palette.key(key)) return;
    if (this.actionBar.key(key)) return;
  }

  handleClick(mouse) {
    this.syncBackButton();
    if (this.backButton.contains(mouse.x, mouse.y)) {
      this.backButton.click();
      return;
    }
    if (this.palette.click(mouse.x, mouse.y)) return;
    if (this.actionBar.click(mouse.x, mouse.y)) return;
    this.clickBoard(mouse.x, mouse.y);
  }

  // ---- Acciones de la botonera ----
  // La lógica real de colocar/rotar/quitar/simular se implementa en los
  // próximos pasos; por ahora quedan cableadas como placeholders.

  doAction(id) {
    if (id === 'up' || id === 'down' || id === 'left' || id === 'right') this.rotate(id);
    else if (id === 'confirm') this.confirm();
    else if (id === 'remove') this.removeItem();
    else if (id === 'run') this.runLevel();
    else if (id === 'reset') this.resetLevel();
  }

  rotate(direction) {}

  confirm() {}

  removeItem() {}

  runLevel() {}

  resetLevel() {}

  // Pendiente: colocar/quitar el ítem seleccionado en la celda tocada.
  clickBoard(x, y) {}

  // Coloca el botón Volver en la cabecera.
  syncBackButton() {
    const header = this.layout.header();
    const pad = 8;
    const height = Math.max(24, header.height - pad * 2);
    const width = Math.min(96, header.width * 0.28);
    this.backButton.rect = {
      x: header.x + header.width - width - pad,
      y: header.y + (header.height - height) / 2,
      width,
      height,
    };
  }

  draw() {
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawHeader(ctx);
    this.drawBoard(ctx);
    this.palette.draw(ctx);
    this.actionBar.draw(ctx);
  }

  drawHeader(ctx) {
    const header = this.layout.header();
    const mouse = this.host.getMouse();

    ctx.fillStyle = '#1b1b1b';
    ctx.fillRect(header.x, header.y, header.width, header.height);

    ctx.fillStyle = '#ddd';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = '16px sans-serif';
    ctx.fillText(`Level ${this.level.number}`, header.x + 12, header.y + header.height / 2);

    this.syncBackButton();
    this.backButton.hovered = this.backButton.contains(mouse.x, mouse.y);
    this.backButton.draw(ctx);
  }

  drawBoard(ctx) {
    const rect = this.layout.board();
    const width = this.level.size.width;
    const height = this.level.size.height;

    const cell = Math.max(1, Math.floor(Math.min(rect.width / width, rect.height / height)));
    const gridWidth = cell * width;
    const gridHeight = cell * height;
    const originX = Math.round(rect.x + (rect.width - gridWidth) / 2);
    const originY = Math.round(rect.y + (rect.height - gridHeight) / 2);

    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= width; i++) {
      const x = originX + i * cell;
      ctx.moveTo(x, originY);
      ctx.lineTo(x, originY + gridHeight);
    }
    for (let j = 0; j <= height; j++) {
      const y = originY + j * cell;
      ctx.moveTo(originX, y);
      ctx.lineTo(originX + gridWidth, y);
    }
    ctx.stroke();
  }
}
