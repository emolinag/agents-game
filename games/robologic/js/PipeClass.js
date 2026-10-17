class PipeClass extends ItemClass {
  draw() {
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#aaa';
    ctx.fillRect(this.x, this.y, 30, 10);
  }
}
