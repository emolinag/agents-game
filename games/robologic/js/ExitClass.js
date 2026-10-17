class ExitClass extends ItemClass {
  draw() {
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#0ff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 12, 0, Math.PI * 2);
    ctx.fill();
  }
}
