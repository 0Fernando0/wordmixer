let tentativas = 1

function setTentativa(tentativa){
    document.getElementById("tentativas").textContent = `${tentativa}/10`
}


function pular(){
    if(tentativas == 10){
        alert("Fim De Jogo");
        tentativas = 1;
        setTentativa(tentativas);
        return;
    }
    tentativas++;
    setTentativa(tentativas)
}