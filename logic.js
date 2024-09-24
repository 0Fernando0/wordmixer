// import * from "/home/fernando/Programacao/Front-End/WordMixer/service";

const PALAVRAS = [
    "terra",
    "agua",
    "fogo",
    "vento"
];
const SCORE_INCREASE = 20;

function animationElement(seletor,name){
    let selector = document.querySelector(seletor);
    setInterval(function(){
        selector.style.animationName = name;    
    });
    selector.style.animationName = "none";   
}


class Mp3{

    constructor(){
        this.next = new Audio("sound/next.mp3");
        this.gameover = new Audio("sound/gameover.mp3");
        this.increase = new Audio("sound/acerto.mp3");
        this._error = new Audio("sound/error.mp3")
    }
    error(){
        this._error.currentTime = 0;
        this._error.play()
    }

    increasePoint(){
        this.increase.currentTime = 0;
        this.increase.play()
    }

    playPular(){
        this.next.currentTime = 0.025;
        this.next.play()
    }

    gameOver(){
        this.gameover.currentTime = 0;
        this.gameover.play()
    }

}

class Game{

    setScore(score){
        this.score.textContent = score;
    }

    setUser(user){
        this.user.value = user;
    }

    zerar(){
        this.setTentativa(1);
        this.setScore(0)
        this.setUser("")
        this.embaralharPalavra();
    }
    
    pular(){
        this.embaralharPalavra();
        this.setTentativa(this.getTentativa() + 1);
        animationElement("p","next")
        this.mp3.playPular()
    }

    jogar(){
        if(this.getUser() == this.palavra){ this.acertar() }
        else{ this.errar() }
    }

    errar(){
        this.setTentativa(this.getTentativa() + 1);
        animationElement("p","next")
        this.mp3.error()
    }

    acertar(){
        this.setScore(this.getScore() + SCORE_INCREASE);
        this.setUser("");
        this.user.focus();
        this.embaralharPalavra()
        animationElement("p:last-child","increase")
        this.mp3.increasePoint()
    }


    embaralharPalavra(){
        function embaralhar(palavra){
            function shuffle(o) {
                for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                return o;
            }
            let palavra_embaralhada = "";
            let array_palavra = String(palavra).split("");
            let array_embaralhado = shuffle(array_palavra);
        
            for (const item of array_embaralhado) {
                palavra_embaralhada += item;
            }
            return palavra_embaralhada;
        }
        const random = PALAVRAS[Math.floor(Math.random() * PALAVRAS.length)];
        this.palavra = random;
        let palavra_gerada = embaralhar(random);
        while(palavra_gerada == this.palavra){
            palavra_gerada = embaralhar(random)
        }
        this.setPalavraEmbaralhada(palavra_gerada)
    }

    getTentativa(){return Number(this.tentativa.textContent);}

    endgame(){
        this.mp3.gameOver();
        alert("Fim De Jogo");
        this.zerar()
    }

    setTentativa(tentativa){
        if(tentativa > 10){this.endgame()}
        else{
            this.tentativa.textContent = tentativa;
        }
    }

    getScore(){return Number(this.score.textContent);}

    getUser(){
        return this.user.value;
    }

    constructor(mp3){
        this.mp3 = mp3
        this.tentativa = document.getElementById("tentativa");
        this.score = document.getElementById("score");
        this.user = document.getElementById("user");
        this.palavra = null
        this.palavra_embaralhada = document.getElementById("palavra");
    }

    setPalavraEmbaralhada(palavra){
        this.palavra_embaralhada.textContent = palavra;
    }

}

let mp3 = new Mp3()
let game = new Game(mp3);

document.body.onload = game.zerar();