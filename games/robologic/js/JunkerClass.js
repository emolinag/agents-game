class JunkerClass extends ItemClass {
  draw() {
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#f00';
    ctx.fillRect(this.x, this.y, 10, 10);
  }
}
