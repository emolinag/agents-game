// Un nivel ya cargado: tamaño del escenario, string de entrada
// y uno o más strings de verificación.
class LevelClass {
  constructor(data, number = 0) {
    this.number = number;
    this.size = data.size || { width: 1, height: 1 };
    this.input = typeof data.input === 'string' ? data.input : '';
    this.verification = Array.isArray(data.verification) ? data.verification : [];
  }
}
