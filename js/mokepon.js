const seccionSelecionataque = document.getElementById("Seleccionar-ataque");
const seccionReinicio = document.getElementById("reiniciar");
const btnSeleccion = document.getElementById("btn-seleccion");
const btnReiniciar = document.getElementById("btn-reiniciar");

const seccionSelecion = document.getElementById("Seleccionar-mascota");
const spanMascotaJugador = document.getElementById("mascota-jugador");

const mascotaEnemigo = document.getElementById("mascota-enemigo");

const vidasJugador = document.getElementById("Vida-jugador");
const vidasEnemigo = document.getElementById("Vida-enemigo");

const seccionMensaje = document.getElementById("resultado");
const ataquedelJugador = document.getElementById("ataquesJugador");
const ataquedelEnemigo = document.getElementById("ataquesEnemigos");

const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const contenedorAtaques = document.getElementById("contenedor-ataques");

let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let opcionDeAtaques;
let ataquesMokeponEnemigo;

let Hipodoge;
let Capipepo;
let Ratigueya;
let Pydos;
let Tucupalma;
let Langostelvis;

let btnFuego;
let btnAgua;
let btnPlanta;
let botones = [];
let iAtaqueJugador;
let iAtaqueEnemigo;

let mascotaJugador;
let victoriasJugador = 0;
let victoriasEnemigo = 0;

//clases
class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
  }
}

let hipodoge = new Mokepon(
  "Hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.webp",
  3
);

let capipepo = new Mokepon(
  "Capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.webp",
  3
);

let ratigueya = new Mokepon(
  "Ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.webp",
  3
);

let pydos = new Mokepon(
  "Pydos",
  "/mokepon/assets/mokepons_mokepon_pydos_attack.png",
  3
);

let tucupalma = new Mokepon(
  "Tucupalma",
  "/mokepon/assets/mokepons_mokepon_tucapalma_attack.png",
  3
);

let langostelvis = new Mokepon(
  "Langostelvis",
  "/mokepon/assets/mokepons_mokepon_langostelvis_attack.png",
  3
);

hipodoge.ataques.push(
  { nombre: "💧", id: "btn-agua" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🌱", id: "btn-planta" }
);

capipepo.ataques.push(
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🔥", id: "btn-fuego" }
);

ratigueya.ataques.push(
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🌱", id: "btn-planta" }
);

pydos.ataques.push(
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "💧", id: "btn-agua" }
);

tucupalma.ataques.push(
  { nombre: "💧", id: "btn-agua" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "🌱", id: "btn-planta" },
  { nombre: "🔥", id: "btn-fuego" }
);

langostelvis.ataques.push(
  { nombre: "💧", id: "btn-agua" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🌱", id: "btn-planta" }
);

mokepones.push(hipodoge, capipepo, ratigueya, pydos, tucupalma, langostelvis);

function iniciarJuego() {
  seccionSelecionataque.style.display = "none";

  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
      <input type="radio" name="mascota" id=${mokepon.nombre} />           
      <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
        <P>${mokepon.nombre}</P>
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
    `;
    contenedorTarjetas.innerHTML += opcionDeMokepones;
  });

  Hipodoge = document.getElementById("Hipodoge");
  Capipepo = document.getElementById("Capipepo");
  Ratigueya = document.getElementById("Ratigueya");
  Pydos = document.getElementById("Pydos");
  Tucupalma = document.getElementById("Tucupalma");
  Langostelvis = document.getElementById("Langostelvis");

  seccionReinicio.style.display = "none";
  btnSeleccion.addEventListener("click", seleccionarMascota);
  btnReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascota() {
  seccionSelecion.style.display = "none";
  seccionSelecionataque.style.display = "flex";

  if (Hipodoge.checked) {
    spanMascotaJugador.innerHTML = Hipodoge.id;
    mascotaJugador = Hipodoge.id;
  } else if (Capipepo.checked) {
    spanMascotaJugador.innerHTML = Capipepo.id;
    mascotaJugador = Capipepo.id;
  } else if (Ratigueya.checked) {
    spanMascotaJugador.innerHTML = Ratigueya.id;
    mascotaJugador = Ratigueya.id;
  } else if (Pydos.checked) {
    spanMascotaJugador.innerHTML = Pydos.id;
    mascotaJugador = Pydos.id;
  } else if (Tucupalma.checked) {
    spanMascotaJugador.innerHTML = Tucupalma.id;
    mascotaJugador = Tucupalma.id;
  } else if (Langostelvis.checked) {
    spanMascotaJugador.innerHTML = Langostelvis.id;
    mascotaJugador = Langostelvis.id;
  } else {
    alert("Selecciona una mascota");
  }

  extraerAtaques(mascotaJugador);
  seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador) {
  let ataques;

  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }

  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    opcionDeAtaques = `
    <button id=${ataque.id} class="btn-ataque Bataque">${ataque.nombre}</button>
    `;
    contenedorAtaques.innerHTML += opcionDeAtaques;
  });

  btnFuego = document.getElementById("btn-fuego");
  btnAgua = document.getElementById("btn-agua");
  btnPlanta = document.getElementById("btn-planta");
  botones = document.querySelectorAll(".Bataque");
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        ataqueJugador.push("Fuego");
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else if (e.target.textContent === "💧") {
        ataqueJugador.push("Agua");
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else {
        ataqueJugador.push("Planta");
        boton.style.background = "#112f58";
        boton.disabled = true;
      }
      ataqueAleatorioEnemigo();
    });
  });
}

function seleccionarMascotaEnemigo() {
  let random = numeroAleatorio(0, mokepones.length - 1);

  mascotaEnemigo.innerHTML = mokepones[random].nombre;
  ataquesMokeponEnemigo = mokepones[random].ataques;

  secuenciaAtaque();
}

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function ataqueAleatorioEnemigo() {
  let ataqueRandom = numeroAleatorio(0, ataquesMokeponEnemigo.length - 1);

  if (ataquesMokeponEnemigo[ataqueRandom].nombre === "🔥") {
    ataqueEnemigo.push("Fuego");
  } else if (ataquesMokeponEnemigo[ataqueRandom].nombre === "💧") {
    ataqueEnemigo.push("Agua");
  } else {
    ataqueEnemigo.push("Planta");
  }
  iniciarPelea();
}

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate();
  }
}

function resultadoDelCombate(jugador, enemigo) {
  iAtaqueJugador = ataqueJugador[jugador];
  iAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
  for (let i = 0; i < ataqueJugador.length; i++) {
    if (ataqueJugador[i] === ataqueEnemigo[i]) {
      resultadoDelCombate(i, i);
      crearMensaje("Empate 🤝");
    } else if (ataqueJugador[i] == "Fuego" && ataqueEnemigo[i] == "Planta") {
      resultadoDelCombate(i, i);
      crearMensaje("Ganaste este turno! 🎉");
      victoriasJugador++;
      vidasJugador.innerHTML = victoriasJugador;
    } else if (ataqueJugador[i] == "Agua" && ataqueEnemigo[i] == "Fuego") {
      resultadoDelCombate(i, i);
      crearMensaje("Ganaste");
      victoriasJugador++;
      vidasJugador.innerHTML = victoriasJugador;
    } else if (ataqueJugador[i] == "Planta" && ataqueEnemigo[i] == "Agua") {
      resultadoDelCombate(i, i);
      crearMensaje("Ganaste");
      victoriasJugador++;
      vidasJugador.innerHTML = victoriasJugador;
    } else {
      resultadoDelCombate(i, i);
      crearMensaje("Perdiste");
      victoriasEnemigo++;
      vidasEnemigo.innerHTML = victoriasEnemigo;
    }
    revisarVctorias();
  }
}

function revisarVctorias() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("Esto fue un Empate 🤝");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("¡Felicidades! Ganaste la batalla 🏆");
  } else {
    crearMensajeFinal("¡Lo siento! Perdiste la batalla 💀");
  }
}

function crearMensaje(resultado) {
  let notAtaqueJugador = document.createElement("p");
  let notAtaqueEnemigo = document.createElement("p");

  seccionMensaje.innerHTML = resultado;
  notAtaqueJugador.innerHTML = iAtaqueJugador;
  notAtaqueEnemigo.innerHTML = iAtaqueEnemigo;

  ataquedelJugador.appendChild(notAtaqueJugador);
  ataquedelEnemigo.appendChild(notAtaqueEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  seccionMensaje.innerHTML = resultadoFinal;
  seccionReinicio.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}

//
window.addEventListener("load", iniciarJuego);
