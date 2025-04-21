const seccionSelecionataque = document.getElementById("Seleccionar-ataque");
const seccionReinicio = document.getElementById("reiniciar");
const btnSeleccion = document.getElementById("btn-seleccion");
const btnFuego = document.getElementById("btn-fuego");
const btnAgua = document.getElementById("btn-agua");
const btnPlanta = document.getElementById("btn-planta");
const btnReiniciar = document.getElementById("btn-reiniciar");

const seccionSelecion = document.getElementById("Selecionar-mascota");
const Hipodoge = document.getElementById("hipodoge");
const Capipepo = document.getElementById("Capipepo");
const Ratigueya = document.getElementById("Ratigueya");
const spanMascotaJugador = document.getElementById("mascota-jugador");

const mascotaEnemigo = document.getElementById("mascota-enemigo");

const vidasJugador = document.getElementById("Vida-jugador");
const vidasEnemigo = document.getElementById("Vida-enemigo");

const seccionMensaje = document.getElementById("resultado");
const ataquedelJugador = document.getElementById("ataquesJugador");
const ataquedelEnemigo = document.getElementById("ataquesEnemigos");

let ataqueJugador = "";
let ataqueEnemigo = "";
let vidaJugador = 3;
let vidaEnemigo = 3;

function iniciarJuego() {
  seccionSelecionataque.style.display = "none";
  seccionReinicio.style.display = "none";
  btnSeleccion.addEventListener("click", seleccionarMascota);
  btnFuego.addEventListener("click", ataqueFuego);
  btnAgua.addEventListener("click", ataqueAgua);
  btnPlanta.addEventListener("click", ataquePlanta);
  btnReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascota() {
  seccionSelecion.style.display = "none";
  seccionSelecionataque.style.display = "flex";
  if (hipodoge.checked) {
    spanMascotaJugador.innerHTML = "Hipodoge";
  } else if (Capipepo.checked) {
    spanMascotaJugador.innerHTML = "Capipepo";
  } else if (Ratigueya.checked) {
    spanMascotaJugador.innerHTML = "Ratigueya";
  } else {
    alert("Selecciona una mascota");
  }

  seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
  let random = numeroAleatorio(1, 3);

  if (random == 1) {
    mascotaEnemigo.innerHTML = "Hipodoge";
  } else if (random == 2) {
    mascotaEnemigo.innerHTML = "Capipepo";
  } else {
    mascotaEnemigo.innerHTML = "Ratigueya";
  }
}

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function ataqueFuego() {
  ataqueJugador = "Fuego";
  ataqueAleatorioEnemigo();
}

function ataqueAgua() {
  ataqueJugador = "Agua";
  ataqueAleatorioEnemigo()();
}

function ataquePlanta() {
  ataqueJugador = "Planta";
  ataqueAleatorioEnemigo()();
}

function ataqueAleatorioEnemigo() {
  let ataqueRandom = numeroAleatorio(1, 3);

  if (ataqueRandom == 1) {
    ataqueEnemigo = "Fuego";
  } else if (ataqueRandom == 2) {
    ataqueEnemigo = "Agua";
  } else {
    ataqueEnemigo = "Planta";
  }

  ResultadoCombate();
}

function ResultadoCombate() {
  if (ataqueJugador == ataqueEnemigo) {
    crearMensaje("Empate");
  } else if (ataqueJugador == "Fuego" && ataqueEnemigo == "Planta") {
    crearMensaje("Ganaste");
    vidaEnemigo--;
    vidasEnemigo.innerHTML = vidaEnemigo;
  } else if (ataqueJugador == "Agua" && ataqueEnemigo == "Fuego") {
    crearMensaje("Ganaste");
    vidaEnemigo--;
    vidasEnemigo.innerHTML = vidaEnemigo;
  } else if (ataqueJugador == "Planta" && ataqueEnemigo == "Agua") {
    crearMensaje("Ganaste");
    vidaEnemigo--;
    vidasEnemigo.innerHTML = vidaEnemigo;
  } else {
    crearMensaje("Perdiste");
    vidaJugador--;
    vidasJugador.innerHTML = vidaJugador;
  }

  revisarVidas();
}

function revisarVidas() {
  if (vidaEnemigo == 0) {
    crearMensajeFinal("Ganaste el juego 🎉");
  } else if (vidaJugador == 0) {
    crearMensajeFinal("Perdiste el juego 😭");
  }
}

function crearMensaje(resultado) {
  let notAtaqueJugador = document.createElement("p");
  let notAtaqueEnemigo = document.createElement("p");

  seccionMensaje.innerHTML = resultado;
  notAtaqueJugador.innerHTML = ataqueJugador;
  notAtaqueEnemigo.innerHTML = ataqueEnemigo;

  ataquedelJugador.appendChild(notAtaqueJugador);
  ataquedelEnemigo.appendChild(notAtaqueEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  seccionMensaje.innerHTML = resultadoFinal;
  btnFuego.disabled = true;
  btnAgua.disabled = true;
  btnPlanta.disabled = true;
  seccionReinicio.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}

//
window.addEventListener("load", iniciarJuego);
