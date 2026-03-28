const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
        enunciado: "Quem é Desmond Doss no filme 'Até o Último Homem'?",
        alternativas: [
            {
                texto: "Um soldado comum que luta com armas",
                afirmacao: "Você ainda está conhecendo a história de Desmond Doss. "
            },
            {
                texto: "Um médico do exército que se recusa a usar armas",
                afirmacao: "Você entende a essência de Desmond Doss: salvar vidas sem tirar nenhuma. "
            }
        ]
    },
    {
        enunciado: "Por que Desmond Doss se recusa a pegar em armas?",
        alternativas: [
            {
                texto: "Porque tem medo da guerra",
                afirmacao: "No começo, parece medo, mas a história mostra algo muito maior. "
            },
            {
                texto: "Por causa de suas crenças religiosas e princípios",
                afirmacao: "Você percebeu que ele segue seus valores acima de tudo. "
            }
        ]
    },
    {
        enunciado: "Como os outros soldados tratam Desmond no início?",
        alternativas: [
            {
                texto: "Com respeito e admiração",
                afirmacao: "Na verdade, isso só acontece depois… no começo foi difícil. "
            },
            {
                texto: "Com preconceito e desconfiança",
                afirmacao: "Exatamente, ele sofreu muito preconceito antes de ser respeitado. "
            }
        ]
    },
    {
        enunciado: "Durante a batalha de Okinawa, qual foi a atitude de Desmond?",
        alternativas: [
            {
                texto: "Fugiu para se proteger",
                afirmacao: "Isso seria comum, mas Desmond fez o oposto. "
            },
            {
                texto: "Voltou sozinho para salvar soldados feridos",
                afirmacao: "Você entendeu o momento mais marcante do filme. "
            }
        ]
    },
    {
        enunciado: "Qual frase representa bem a missão de Desmond Doss?",
        alternativas: [
            {
                texto: "“Senhor, me ajude a salvar mais um”",
                afirmacao: "Essa frase resume toda a coragem e fé dele. "
            },
            {
                texto: "“Preciso vencer essa guerra a qualquer custo”",
                afirmacao: "Essa não é a visão de Desmond, ele queria salvar vidas. "
            }
        ]
    }
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
        const botao = document.createElement("button");
        botao.textContent = alternativa.texto;
        botao.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botao);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    historiaFinal += opcaoSelecionada.afirmacao + " ";
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = "Resultado Final";
    
    textoResultado.textContent =
        historiaFinal +
        "Você acompanhou a jornada de Desmond Doss, um verdadeiro herói que mostrou que coragem não é sobre lutar, mas sobre salvar vidas.";

    caixaAlternativas.textContent = "";
}

mostraPergunta();

/* RELÓGIO */

const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');

setInterval(function () {
    let dateToday = new Date();

    let hr = dateToday.getHours();
    let min = dateToday.getMinutes();
    let s = dateToday.getSeconds();

    horas.textContent = hr.toString().padStart(2, '0');
    minutos.textContent = min.toString().padStart(2, '0');
    segundos.textContent = s.toString().padStart(2, '0');
});
