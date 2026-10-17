// Botón genérico: un rectángulo con etiqueta, color de acento opcional y una
// acción que se ejecuta al hacer clic. Sabe si está seleccionado o bajo el cursor.
class ButtonClass {
  constructor(rect, config = {}) {
    this.rect = rect;
    this.label = config.label || '';
    this.color = config.color || null;
    this.action = config.action || null;
    this.selected = false;
    this.hovered = false;
  }

  contains(x, y) {
    const { rect } = this;
    return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
  }

  click() {
    if (typeof this.action === 'function') this.action();
  }

  draw(ctx) {
    const { x, y, width, height } = this.rect;
    ctx.fillStyle = this.selected ? '#1f6f4a' : (this.hovered ? '#2b2b2b' : '#1b1b1b');
    ctx.fillRect(x, y, width, height);

    if (this.color) {
      const stripeWidth = 6;
      const stripeHeight = Math.min(16, height * 0.5);
      ctx.fillStyle = this.color;
      ctx.fillRect(x + 3, y + (height - stripeHeight) / 2, stripeWidth, stripeHeight);
    }

    ctx.strokeStyle = this.selected ? '#5fd39a' : '#555';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    if (this.label) {
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `${this.labelSize(ctx, width - 14)}px sans-serif`;
      ctx.fillText(this.label, x + width / 2 + (this.color ? 4 : 0), y + height / 2);
    }
  }

  // Reduce el tamaño de fuente hasta que la etiqueta entre en el botón.
  labelSize(ctx, maxWidth) {
    let size = 18;
    ctx.font = `${size}px sans-serif`;
    while (size > 8 && ctx.measureText(this.label).width > maxWidth) {
      size -= 1;
      ctx.font = `${size}px sans-serif`;
    }
    return size;
  }
}
