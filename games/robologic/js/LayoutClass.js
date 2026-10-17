// Calcula las regiones de la pantalla del escenario a partir del tamaño del
// canvas y su orientación:
//   - ancho (PC / celular horizontal): la botonera va en una columna a la izquierda.
//   - alto (celular vertical): la botonera va al pie.
// La cabecera siempre está arriba.
class LayoutClass {
  constructor(canvas) {
    this.canvas = canvas;
  }

  isWide() {
    return this.canvas.width >= this.canvas.height;
  }

  header() {
    const height = Math.max(36, Math.min(64, this.canvas.height * 0.08));
    return { x: 0, y: 0, width: this.canvas.width, height };
  }

  panel() {
    const header = this.header();
    if (this.isWide()) {
      const width = Math.max(150, Math.min(260, this.canvas.width * 0.28));
      return { x: 0, y: header.height, width, height: this.canvas.height - header.height };
    }
    const height = Math.max(140, Math.min(240, this.canvas.height * 0.34));
    return { x: 0, y: this.canvas.height - height, width: this.canvas.width, height };
  }

  // Área libre para el tablero (excluye cabecera y botonera).
  boardArea() {
    const header = this.header();
    const panel = this.panel();
    if (this.isWide()) {
      return {
        x: panel.width,
        y: header.height,
        width: this.canvas.width - panel.width,
        height: this.canvas.height - header.height,
      };
    }
    return {
      x: 0,
      y: header.height,
      width: this.canvas.width,
      height: panel.y - header.height,
    };
  }

  // Región cuadrada y centrada donde se dibuja la cuadrícula.
  board() {
    const area = this.boardArea();
    const margin = 12;
    const size = Math.max(1, Math.min(area.width, area.height) - margin * 2);
    return {
      x: Math.round(area.x + (area.width - size) / 2),
      y: Math.round(area.y + (area.height - size) / 2),
      width: Math.round(size),
      height: Math.round(size),
    };
  }

  panelInner() {
    const panel = this.panel();
    const pad = 8;
    return {
      x: panel.x + pad,
      y: panel.y + pad,
      width: panel.width - pad * 2,
      height: panel.height - pad * 2,
    };
  }

  paletteRegion() {
    const inner = this.panelInner();
    return { x: inner.x, y: inner.y, width: inner.width, height: Math.round(inner.height * 0.55) };
  }

  actionsRegion() {
    const inner = this.panelInner();
    const y = inner.y + Math.round(inner.height * 0.55) + 8;
    return { x: inner.x, y, width: inner.width, height: Math.max(0, inner.y + inner.height - y) };
  }

  // Distribuye `count` celdas en una grilla dentro de `region`.
  grid(region, count, columns, gap) {
    const rows = Math.max(1, Math.ceil(count / columns));
    const cellWidth = (region.width - gap * (columns - 1)) / columns;
    const cellHeight = (region.height - gap * (rows - 1)) / rows;
    const rects = [];
    for (let i = 0; i < count; i++) {
      const col = i % columns;
      const row = Math.floor(i / columns);
      rects.push({
        x: region.x + col * (cellWidth + gap),
        y: region.y + row * (cellHeight + gap),
        width: Math.max(0, cellWidth),
        height: Math.max(0, cellHeight),
      });
    }
    return rects;
  }
}
