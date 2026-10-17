// Pantalla con la lista de todos los niveles disponibles.
// Es un menú cuyas opciones se construyen a partir de los datos de niveles.
class LevelsClass extends MenuClass {
  constructor(host) {
    super(host, {
      title: 'Levels',
      items: host.getLevels().map((level) => ({
        label: `Level ${level.number}`,
        action: () => this.openLevel(level),
      })),
    });
  }

  // Abre el escenario del nivel elegido y espera para volver a mostrarse.
  openLevel(level) {
    this.open(new BoardClass(this.host, level), () => { this.target = null; });
  }
}
