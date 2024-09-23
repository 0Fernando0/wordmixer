let tentativas = 1

const PALAVRAS = [
    "terra",
    "agua",
    "fogo",
    "vento"
];

palavra_correta = null;
user = document.getElementById("user");
score = document.getElementById("score");

document.body.onload = function(){
    carregarPalavra();
}

function endGameScreen(){
    let mensagem = "Fim De Jogo\n" + `Pontuação: ${score.textContent}`
    alert(mensagem);
}

function acertar(){
    carregarPalavra()
    score.textContent = Number(score.textContent) + 20; 
    user.value = "";
    user.focus();
}

function errar(){
    alert("errou");
    setTentativa(++tentativas);
}

function tentar(){
    if(user.value == palavra_correta){ acertar() }
    else{ errar() }
}


function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

function embaralhar(palavra){
    let palavra_embaralhada = "";
    let array_palavra = String(palavra).split("");
    let array_embaralhado = shuffle(array_palavra);

    for (const item of array_embaralhado) {
        palavra_embaralhada += item;
    }
    return palavra_embaralhada;
}

function carregarPalavra(){
    let random = PALAVRAS[Math.floor(Math.random() * PALAVRAS.length)];
    palavra_correta = random;
    let palavra_embaralhada = embaralhar(random);
    document.getElementById("palavra").textContent = palavra_embaralhada;
}


function zerar(){
    endGameScreen();
    score.textContent = 0;
    tentativas = 1;
    document.getElementById("tentativas").textContent = 1;
    carregarPalavra()
}

function setTentativa(tentativa){
    if(tentativa > 10){ zerar() }
    else{
        document.getElementById("tentativas").textContent = tentativa;
    }
}

function pular(){
    setTentativa(++tentativas)
    carregarPalavra()
}