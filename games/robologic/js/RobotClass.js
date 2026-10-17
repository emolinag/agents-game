class RobotClass extends ItemClass {
  draw() {
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#0f0';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
    ctx.fill();
  }
}
