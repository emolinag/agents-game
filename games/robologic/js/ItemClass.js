class ItemClass {
  constructor(canvas, x = 0, y = 0) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
  }

  // Cada objeto sabe cómo dibujarse con el canvas que recibe.
  // Los objetos de lógica pura pueden no implementar representación.
  draw() {}
}
