let nome = prompt("Qual é o seu nome?");
let quantCartas = solicitarQuantidadeCartas();

let primeiraCartaVirada = null;
let segundaCartaVirada = null;
let jogadas = 0;
let paresEncontrados = 0;
let fimDeJogo = false;

const container = document.querySelector(".container");

const gifs = [
    "imagens/bobrossparrot.gif",
    "imagens/explodyparrot.gif",
    "imagens/fiestaparrot.gif",
    "imagens/metalparrot.gif",
    "imagens/revertitparrot.gif",
    "imagens/tripletsparrot.gif",
    "imagens/unicornparrot.gif",
];

iniciarJogo();

function solicitarQuantidadeCartas() {
    let qtd;
    do {
        qtd = Number(prompt("Com quantas cartas você deseja jogar? (Par, entre 4 e 14)"));
    } while (qtd < 4 || qtd > 14 || qtd % 2 !== 0);
    return qtd;
}

function iniciarJogo() {
    const cartas = embaralharCartas(quantCartas, gifs);
    criarCartas(container, cartas);
}

function embaralharCartas(quantidade, gifsDisponiveis) {
    const cartaDuplicada = [];
    for (let i = 0; i < quantidade / 2; i++) {
        cartaDuplicada.push(gifsDisponiveis[i]);
        cartaDuplicada.push(gifsDisponiveis[i]);
    }
    return cartaDuplicada.sort(() => Math.random() - 0.5);
}

function criarCartas(container, cartas) {
    container.innerHTML = "";
    cartas.forEach(src => {
        const carta = document.createElement("div");
        carta.classList.add("carta");

        const frente = document.createElement("div");
        frente.classList.add("carta-frente");
        frente.innerHTML = `<img src="imagens/back.png" alt="Frente da carta">`;

        const verso = document.createElement("div");
        verso.classList.add("carta-verso");
        verso.innerHTML = `<img src="${src}" alt="Verso da carta">`;

        carta.appendChild(frente);
        carta.appendChild(verso);
        container.appendChild(carta);

        carta.addEventListener("click", () => virarCarta(carta));
    });
}

function virarCarta(carta) {
    if (carta.classList.contains("carta-virada") || segundaCartaVirada || fimDeJogo) return;

    carta.classList.add("carta-virada");

    jogadas++; 

    if (!primeiraCartaVirada) {
        primeiraCartaVirada = carta;
    } else {
        segundaCartaVirada = carta;
        verificarPares();
    }
}

function verificarPares() {
    const img1 = primeiraCartaVirada.querySelector(".carta-verso img").src;
    const img2 = segundaCartaVirada.querySelector(".carta-verso img").src;

    if (img1 === img2) {
        paresEncontrados++;
        primeiraCartaVirada = null;
        segundaCartaVirada = null;
        verificarFinalJogo();
    } else {
        setTimeout(() => {
            primeiraCartaVirada.classList.remove("carta-virada");
            segundaCartaVirada.classList.remove("carta-virada");
            primeiraCartaVirada = null;
            segundaCartaVirada = null;
        }, 1000);
    }
}

function verificarFinalJogo() {
    if (paresEncontrados === quantCartas / 2) {
        fimDeJogo = true;
        setTimeout(() => {
            const reiniciar = confirm(`Parabéns, ${nome}! Você venceu em ${jogadas} jogadas! Deseja jogar novamente?`);
            if (reiniciar) {
                reiniciarJogo();
            }
        }, 500);
    }
}

function reiniciarJogo() {
    primeiraCartaVirada = null;
    segundaCartaVirada = null;
    jogadas = 0;
    paresEncontrados = 0;
    fimDeJogo = false;

    quantCartas = solicitarQuantidadeCartas();
    iniciarJogo();
}