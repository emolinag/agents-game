// GameClass representa el juego entero (menús, escenario y objetos) y es el
// orquestador: carga los niveles y arranca delegando en el menú principal.
class GameClass extends ScreenClass {
  constructor(app) {
    super(app);
    this.levels = LEVELS.map((data, index) => new LevelClass(data, index + 1));
    this.target = new MenuClass(this);
  }

  // Las pantallas obtienen de acá el canvas, el mouse y los niveles.
  getCanvas() {
    return this.host.getCanvas();
  }

  getMouse() {
    return this.host.getMouse();
  }

  getLevels() {
    return this.levels;
  }
}
