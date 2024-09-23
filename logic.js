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
    },100);
    selector.style.animationName = "none";   
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
    }

    jogar(){
        if(this.getUser() == this.palavra){
            this.acertar()
        }
        else{ this.errar() }
    }

    errar(){
        this.setTentativa(this.getTentativa() + 1);
        animationElement("p","next")
    }

    acertar(){
        this.setScore(this.getScore() + SCORE_INCREASE);
        this.setUser("");
        this.user.focus();
        this.embaralharPalavra()
        animationElement("p:last-child","increase")
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
        this.setPalavraEmbaralhada(embaralhar(random))
    }

    getTentativa(){return Number(this.tentativa.textContent);}
    setTentativa(tentativa){
        if(tentativa > 10){
            alert("Fim De Jogo");
            this.zerar()
            return
        }
        this.tentativa.textContent = tentativa;
    }

    getScore(){return Number(this.score.textContent);}

    getUser(){
        return this.user.value;
    }

    constructor(){
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

let game = new Game();

document.body.onload = game.zerar();