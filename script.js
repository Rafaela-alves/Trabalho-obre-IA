const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

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

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.classList.add("botao-alternativa"); // classe para estilizar
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = opcaoSelecionada.afirmacao;
    historiaFinal += afirmacoes + "\n";
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = "Sua Jornada no Filme 'Até o Último Homem'";
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = "";

    // Botão para reiniciar
    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.textContent = "Reiniciar Quiz";
    botaoReiniciar.addEventListener("click", () => {
        atual = 0;
        historiaFinal = "";
        mostraPergunta();
    });
    caixaAlternativas.appendChild(botaoReiniciar);
}

mostraPergunta();

// RELÓGIO
const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');

setInterval(function time() {
    let dateToday = new Date();
    let hr = dateToday.getHours();
    let min = dateToday.getMinutes();
    let s = dateToday.getSeconds();

    if (hr < 10) hr = '0' + hr;
    if (min < 10) min = '0' + min;
    if (s < 10) s = '0' + s;

    horas.textContent = hr;
    minutos.textContent = min;
    segundos.textContent = s;
}, 1000);
