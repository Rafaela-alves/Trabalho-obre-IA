// =========================
// Elementos do DOM
// =========================
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const textoResultado = document.querySelector(".texto-resultado");

// =========================
// Perguntas do quiz
// =========================
const perguntas = [
    {
        enunciado: "O filme 'Até o Último Homem' conta a história de Desmond Doss. Qual era sua principal crença?",
        alternativas: [
            { texto: "Ele acreditava em nunca matar e salvar vidas.", afirmacao: "Você valoriza a coragem e a moral acima de tudo." },
            { texto: "Ele queria se tornar herói a qualquer custo.", afirmacao: "Você percebe que a glória não é o mais importante." }
        ]
    },
    {
        enunciado: "Desmond Doss serviu como médico no exército durante a Segunda Guerra Mundial. Como ele se destacou?",
        alternativas: [
            { texto: "Salvando dezenas de soldados sem usar armas.", afirmacao: "Você reconhece que heroísmo pode vir de compaixão." },
            { texto: "Liderando ataques e estratégias de combate.", afirmacao: "Você entende que liderança não é só força física." }
        ]
    },
    {
        enunciado: "Durante o treinamento militar, muitos zombaram de Desmond. Como ele reagiu?",
        alternativas: [
            { texto: "Manteve sua fé e princípios, sem ceder à violência.", afirmacao: "Você valoriza a perseverança diante da pressão." },
            { texto: "Acabou participando de brigas para se encaixar.", afirmacao: "Você aprendeu que ceder aos outros pode ter consequências." }
        ]
    },
    {
        enunciado: "No campo de batalha, Desmond enfrentou situações extremas. Qual era sua prioridade?",
        alternativas: [
            { texto: "Salvar vidas, mesmo arriscando a própria.", afirmacao: "Você admira a coragem altruísta de salvar os outros." },
            { texto: "Seguir ordens rapidamente sem questionar.", afirmacao: "Você entende a importância de disciplina militar." }
        ]
    },
    {
        enunciado: "Ao final do filme, Desmond recebeu a Medalha de Honra. O que isso representa?",
        alternativas: [
            { texto: "Reconhecimento pelo heroísmo sem violência.", afirmacao: "Você percebe que princípios podem superar a guerra." },
            { texto: "Um exemplo de disciplina e obediência militar.", afirmacao: "Você entende que disciplina também é valiosa, mas não é tudo." }
        ]
    },
];

// =========================
// Variáveis de controle
// =========================
let atual = 0;
let historiaFinal = [];

// =========================
// Funções do Quiz
// =========================
function iniciaQuiz() {
    atual = 0;
    historiaFinal = [];
    mostraPergunta();
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    const perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.innerHTML = "";

    perguntaAtual.alternativas.forEach(alternativa => {
        const botao = document.createElement("button");
        botao.textContent = alternativa.texto;
        botao.classList.add("botao-alternativa");

        botao.addEventListener("click", () => {
            botao.disabled = true; // Desativa o botão após clicar
            respostaSelecionada(alternativa.afirmacao);
            botao.classList.add("clicado"); // Adiciona a animação de clique
        });

        caixaAlternativas.appendChild(botao);
    });
}

function respostaSelecionada(afirmacao) {
    historiaFinal.push(afirmacao);
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = "Sua Jornada no Filme 'Até o Último Homem'";
    textoResultado.textContent = historiaFinal.join("\n");
    caixaAlternativas.innerHTML = "";

    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.textContent = "Reiniciar Quiz";
    botaoReiniciar.classList.add("botao-reiniciar");
    botaoReiniciar.addEventListener("click", iniciaQuiz);

    caixaAlternativas.appendChild(botaoReiniciar);
}

// =========================
// Relógio digital
// =========================
function atualizaRelogio() {
    const horasElem = document.getElementById('horas');
    const minutosElem = document.getElementById('minutos');
    const segundosElem = document.getElementById('segundos');

    const agora = new Date();
    const hr = String(agora.getHours()).padStart(2, '0');
    const min = String(agora.getMinutes()).padStart(2, '0');
    const s = String(agora.getSeconds()).padStart(2, '0');

    horasElem.textContent = hr;
    minutosElem.textContent = min;
    segundosElem.textContent = s;
}

setInterval(atualizaRelogio, 1000);

// =========================
// Inicialização
// =========================
iniciaQuiz();
