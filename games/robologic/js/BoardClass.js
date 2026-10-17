// Escenario de un nivel: dibuja la cuadrícula según el tamaño del nivel.
// Con `Esc` vuelve a la pantalla anterior (la lista de niveles).
class BoardClass extends ScreenClass {
  constructor(host, level) {
    super(host);
    this.canvas = host.getCanvas();
    this.level = level;
  }

  draw() {
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const width = this.level.size.width;
    const height = this.level.size.height;

    // La cuadrícula se centra y se ajusta al canvas.
    const cell = Math.max(1, Math.floor(Math.min(
      (this.canvas.width * 0.8) / width,
      (this.canvas.height * 0.7) / height,
    )));
    const boardWidth = cell * width;
    const boardHeight = cell * height;
    const originX = Math.round((this.canvas.width - boardWidth) / 2);
    const originY = Math.round((this.canvas.height - boardHeight) / 2);

    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= width; i++) {
      const x = originX + i * cell;
      ctx.moveTo(x, originY);
      ctx.lineTo(x, originY + boardHeight);
    }
    for (let j = 0; j <= height; j++) {
      const y = originY + j * cell;
      ctx.moveTo(originX, y);
      ctx.lineTo(originX + boardWidth, y);
    }
    ctx.stroke();

    // Encabezado con el nivel y la ayuda.
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#aaa';
    ctx.font = '16px sans-serif';
    ctx.fillText(`Level ${this.level.number}`, this.canvas.width / 2, originY - 24);

    ctx.fillStyle = '#777';
    ctx.font = '14px sans-serif';
    ctx.fillText('Esc: volver a la lista de niveles', this.canvas.width / 2, this.canvas.height - 24);
  }
}
