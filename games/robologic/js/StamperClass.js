class StamperClass extends ItemClass {
  draw() {
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#ff0';
    ctx.fillRect(this.x, this.y, 10, 10);
  }
}
