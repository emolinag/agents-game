// Datos de los niveles disponibles.
// Estructura JSON: `size` es el tamaño del escenario, `input` es el string de
// entrada y `verification` es uno o más strings de verificación.
// El formato interno de `input` y `verification` todavía no está definido:
// por ahora se guardan tal cual (ver Pendientes en agents.md).
const LEVELS = [
  { size: { width: 3, height: 2 }, input: '', verification: [''] },
  { size: { width: 4, height: 4 }, input: '', verification: [''] },
  { size: { width: 4, height: 4 }, input: '', verification: [''] },
  { size: { width: 6, height: 6 }, input: '', verification: [''] },
  { size: { width: 6, height: 4 }, input: '', verification: [''] },
  { size: { width: 6, height: 6 }, input: '', verification: ['', ''] },
];
