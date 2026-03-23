const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
        enunciado:"Já parou pra pensar como a inteligência artificial tá mudando tudo? Ela pega um monte de informação e transforma em coisas úteis, deixando o mundo mais prático e conectado.",
        alternativas: [
            {
                texto: "Isso é muito dahora!",
                afirmacao: "Da medo do que essa tecnologia pode fazer. "
            },
            {
                texto: "Isso é maravilhoso Rafaela!",
                afirmacao: "Quero saber como usar IA no seu dia a dia."
            }
        ]
    },
    {
        enunciado: "Na escola, a professora começou a falar sobre IA e pediu um trabalho sobre como ela pode ser usada na sala de aula. E aí, o que você faz?",
        alternativas: [
            {
                texto: "Utiliza uma ferramenta de busca na internet com IA pra encontrar informações e entender melhor o tema.",
                afirmacao: "Conseguiu utilizar a IA para buscar informações úteis."
            },
            {
                texto: "Faz o trabalho com ajuda de colegas, pesquisas e o que você já sabe.",
                afirmacao: "Sentiu mais facilidade em utilizar seus próprios recursos para escrever seu trabalho."
            }
        ]
    },
    {
        enunciado: "Depois do trabalho, rolou um debate na sala sobre como a IA pode impactar o futuro dos empregos. Qual é a sua opinião?",
        alternativas: [
            {
                texto: "A IA pode criar novas oportunidades e ajudar as pessoas a evoluírem.",
                afirmacao: "Vem impulsionando a inovação na área de IA e luta para abrir novos caminhos profissionais com IA."
            },
            {
                texto: "Fico preocupado com quem pode perder o emprego por causa das máquinas.",
                afirmacao: "Sua preocupação com as pessoas motivou a criar um grupo de estudos para discutir o uso ético da IA."
            }
        ]
    },
    {
        enunciado: "No final, a professora pediu pra você criar uma imagem no computador mostrando o que pensa sobre IA. Como você faz isso?",
        alternativas: [
            {
                texto: "Uso um programa tipo Paint e faço tudo manualmente.",
                afirmacao: "Decidiu ajudar outras pessoas a aprenderem ferramentas de desenho digital."
            },
            {
                texto: "Uso um gerador de imagens com IA pra facilitar.",
                afirmacao: "Agora consegue criar imagens mais rápido e até ensinar outras pessoas a usar IA."
            }
        ]
    },
    {
        enunciado: "Você tem um trabalho em grupo atrasado e alguém usou IA pra fazer tudo pronto. O que você faz?",
        alternativas: [
            {
                texto: "Tá valendo, usar IA já é parte do trabalho mesmo.",
                afirmacao: "Acabou ficando dependente da IA para fazer todas as tarefas."
            },
            {
                texto: "Melhor revisar, ajustar e colocar nossas próprias ideias também.",
                afirmacao: "Aprendeu que a IA deve ajudar, mas não substituir totalmente o pensamento próprio."
            }
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

function mostraAlternativas(){
    for(const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = opcaoSelecionada.afirmacao;
    historiaFinal += afirmacoes + " ";
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = "Em 2049...";
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = "";
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
});
