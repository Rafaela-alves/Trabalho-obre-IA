const telaInicial = document.getElementById("telaInicial");
const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const textoResultado = document.querySelector(".texto-resultado");
const progresso = document.querySelector(".progresso");
const pontuacaoEl = document.querySelector(".pontuacao");
const rankingLista = document.getElementById("listaRanking");

const inputNome = document.getElementById("nomeJogador");
const btnIniciar = document.getElementById("btnIniciar");

const cronometroEl = document.getElementById("cronometro");
const barraTempo = document.getElementById("barraTempo");

let nomeJogador = "";
let pontos = 0;
let atual = 0;
let tempo = 10;
let intervalo;

/* PERGUNTAS */
const perguntas = [
    {
        enunciado: "Durante a Segunda Guerra Mundial, Desmond Doss ficou conhecido por sua coragem. Qual era sua função no exército?",
        correta: 1,
        alternativas: [
            "Atuava como soldado armado",
            "Médico de combate sem portar armas"
        ]
    },
    {
        enunciado: "Por qual motivo Desmond Doss se recusava a usar armas durante a guerra?",
        correta: 1,
        alternativas: [
            "Medo do combate",
            "Convicções religiosas"
        ]
    },
    {
        enunciado: "Como Desmond Doss era tratado no início por seus companheiros de exército?",
        correta: 1,
        alternativas: [
            "Com respeito imediato",
            "Com preconceito e zombaria"
        ]
    },
    {
        enunciado: "Qual foi o principal ato heroico de Desmond Doss na Batalha de Okinawa?",
        correta: 1,
        alternativas: [
            "Abandonou o campo de batalha",
            "Salvou dezenas de soldados feridos"
        ]
    }
];

/* INICIAR */
btnIniciar.onclick = () => {
    nomeJogador = inputNome.value.trim();

    if (nomeJogador === "") {
        alert("Digite seu nome!");
        return;
    }

    pontos = 0;
    atual = 0;

    telaInicial.style.display = "none";
    caixaPrincipal.style.display = "block";

    mostraPergunta();
};

/* CRONÔMETRO + BARRA */
function iniciarCronometro() {
    tempo = 10;

    barraTempo.style.width = "100%";
    barraTempo.classList.remove("perigo");

    cronometroEl.textContent = `⏱️ ${tempo}s`;

    intervalo = setInterval(() => {
        tempo--;

        cronometroEl.textContent = `⏱️ ${tempo}s`;

        let porcentagem = (tempo / 20) * 100;
        barraTempo.style.width = porcentagem + "%";

        if (tempo <= 3) {
            barraTempo.classList.add("perigo");
        }

        if (tempo <= 0) {
            clearInterval(intervalo);
            barraTempo.style.width = "0%";
            tempoEsgotado();
        }

    }, 1000);
}

function tempoEsgotado() {
    document.body.classList.add("shake");

    setTimeout(() => {
        document.body.classList.remove("shake");
    }, 300);

    document.querySelectorAll(".caixa-alternativas button").forEach(b => b.disabled = true);

    setTimeout(() => {
        atual++;
        mostraPergunta();
    }, 800);
}

/* QUIZ */
function mostraPergunta() {
    clearInterval(intervalo);

    if (atual >= perguntas.length) {
        mostrarResultado();
        return;
    }

    let p = perguntas[atual];

    caixaPerguntas.textContent = p.enunciado;
    caixaAlternativas.innerHTML = "";

    progresso.style.width = (atual / perguntas.length) * 100 + "%";
    pontuacaoEl.textContent = `Pontuação: ${pontos}/${perguntas.length}`;

    p.alternativas.forEach((alt, index) => {
        const botao = document.createElement("button");
        botao.textContent = alt;

        botao.onclick = () => {
            clearInterval(intervalo);

            if (index === p.correta) {
                botao.classList.add("correta");
                pontos++;
            } else {
                botao.classList.add("errada");

                document.body.classList.add("shake");
                document.body.classList.add("flash");

                setTimeout(() => {
                    document.body.classList.remove("shake");
                    document.body.classList.remove("flash");
                }, 300);
            }

            document.querySelectorAll(".caixa-alternativas button").forEach(b => b.disabled = true);

            setTimeout(() => {
                atual++;
                mostraPergunta();
            }, 800);
        };

        caixaAlternativas.appendChild(botao);
    });

    iniciarCronometro();
}

/* RESULTADO */
function mostrarResultado() {
    clearInterval(intervalo);

    caixaPerguntas.innerHTML = "MISSÃO CONCLUÍDA";
    caixaPerguntas.classList.add("missao");

    textoResultado.textContent = `🎯 ${nomeJogador}, você fez ${pontos} pontos!`;

    salvarRanking();
    mostrarRanking();

    caixaAlternativas.innerHTML = "";
    progresso.style.width = "100%";
    cronometroEl.textContent = "";
    barraTempo.style.width = "0%";
}

/* RANKING (4 jogadores) */
function salvarRanking() {
    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    ranking.push({ nome: nomeJogador, pontos });

    if (ranking.length > 4) {
        ranking = ranking.slice(-4);
    }

    localStorage.setItem("ranking", JSON.stringify(ranking));
}

function mostrarRanking() {
    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    rankingLista.innerHTML = "";

    ranking.forEach((j, index) => {
        let li = document.createElement("li");

        let medalha = "";

        if (index === ranking.length - 1) medalha = "🥇";
        else if (index === ranking.length - 2) medalha = "🥈";
        else if (index === ranking.length - 3) medalha = "🥉";
        else medalha = "🏅";

        li.textContent = `${medalha} ${j.nome} - ${j.pontos} pontos`;

        rankingLista.appendChild(li);
    });
}
