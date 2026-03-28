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

let nomeJogador = "";
let pontos = 0;
let atual = 0;

const perguntas = [
    {
        enunciado: "Quem é Desmond Doss?",
        correta: 1,
        alternativas: ["Soldado armado", "Médico sem armas"]
    },
    {
        enunciado: "Por que ele não usa armas?",
        correta: 1,
        alternativas: ["Medo", "Religião"]
    },
    {
        enunciado: "Como era tratado?",
        correta: 1,
        alternativas: ["Respeito", "Preconceito"]
    },
    {
        enunciado: "O que fez na guerra?",
        correta: 1,
        alternativas: ["Fugiu", "Salvou soldados"]
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

/* QUIZ */
function mostraPergunta() {
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
}

/* RESULTADO */
function mostrarResultado() {
    caixaPerguntas.innerHTML = "MISSÃO CONCLUÍDA";
    caixaPerguntas.classList.add("missao");

    textoResultado.textContent = `🎯 ${nomeJogador}, você fez ${pontos} pontos!`;

    salvarRanking();
    mostrarRanking();

    caixaAlternativas.innerHTML = "";
    progresso.style.width = "100%";
}

/* SALVAR RANKING */
function salvarRanking() {
    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    ranking.push({ nome: nomeJogador, pontos });

    ranking.sort((a, b) => b.pontos - a.pontos);
    ranking = ranking.slice(0, 5);

    localStorage.setItem("ranking", JSON.stringify(ranking));
}

/* MOSTRAR RANKING COM MEDALHAS */
function mostrarRanking() {
    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    rankingLista.innerHTML = "";

    ranking.forEach((j, index) => {
        let li = document.createElement("li");

        let medalha = "";

        if (index === 0) medalha = "🥇";
        else if (index === 1) medalha = "🥈";
        else if (index === 2) medalha = "🥉";
        else medalha = "🏅";

        li.textContent = `${medalha} ${j.nome} - ${j.pontos} pontos`;

        rankingLista.appendChild(li);
    });
}
