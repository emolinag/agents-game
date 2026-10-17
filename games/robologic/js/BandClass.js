class BandClass extends ItemClass {
  draw() {
    const ctx = this.canvas.getContext('2d');
    ctx.strokeStyle = '#f0f';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + 70, this.y + 70);
    ctx.stroke();
  }
}
