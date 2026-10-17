class SwitchClass extends ItemClass {
  draw() {
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#888';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}
