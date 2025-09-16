import { pedirCarta, valorCarta, crearCartaHTML } from "./";

/**
 * turno de la computadora
 * @param {Number} puntosMinimos puntos minimos que la computadora necesita para ganar
 * @param {HTMLElement} puntosHTML elemento HTML para mostrar los puntos
 * @param {HTMLElement} divCartasComputadora elemento HTML para mostrar las cartas
 * @param {Array<String>} deck
 */
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
  duration: 2000, // tiempo en ms
  position: {
    x: "center",
    y: "center",
  },
  types: [
    {
      type: "info",
      background: "#3b82f6",
      icon: false,
    },
  ],
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const turnoComputadora = async (
  puntosMinimos,
  puntosHTML,
  divCartasComputadora,
  deck = []
) => {
  if (!puntosMinimos) throw new Error("Puntos mínimos son necesarios");
  if (!puntosHTML) throw new Error("Argumento puntosHTML es necesario");

  let puntosComputadora = 0;

  do {
    const carta = pedirCarta(deck);

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML.innerText = puntosComputadora;

    const imgCarta = crearCartaHTML(carta);
    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
    await sleep(500);
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      notyf.open({ type: "info", message: "😐 Empate" });
    } else if (puntosMinimos > 21) {
      notyf.success("🤖 Computadora gana");
    } else if (puntosComputadora > 21) {
      notyf.success("🏆 Jugador gana");
    } else {
      notyf.error("🤖 Computadora gana");
    }
  }, 500);
};
