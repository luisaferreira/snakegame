window.onload = function () {

    var stage = document.getElementById('tabuleiro');
    var ctx = stage.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 80);

    const velocidade = 1;

    var velocidadeCobraX = velocidadeCobraY = 0;
    var posicaoCobraX = 10;
    var posicaoCobraY = 15;
    var tamanhoPeca = 30;
    var quantidadePecas = 20;
    var posicaoMacaX = posicaoMacaY = 15;

    var rastro = [];
    cauda = 5;

    function game() {
        posicaoCobraX += velocidadeCobraX;
        posicaoCobraY += velocidadeCobraY;
        if (posicaoCobraX < 0) {
            posicaoCobraX = quantidadePecas - 1;
        }
        if (posicaoCobraX > quantidadePecas - 1) {
            posicaoCobraX = 0;
        }
        if (posicaoCobraY < 0) {
            posicaoCobraY = quantidadePecas - 1;
        }
        if (posicaoCobraY > quantidadePecas - 1) {
            posicaoCobraY = 0;
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, stage.width, stage.height);

        ctx.fillStyle = "red";
        ctx.fillRect(posicaoMacaX * tamanhoPeca, posicaoMacaY * tamanhoPeca, tamanhoPeca, tamanhoPeca);

        ctx.fillStyle = "#2fbd68";
        for (var i = 0; i < rastro.length; i++) {
            ctx.fillRect(rastro[i].x * tamanhoPeca, rastro[i].y * tamanhoPeca, tamanhoPeca - 1, tamanhoPeca - 1);
            if (rastro[i].x == posicaoCobraX && rastro[i].y == posicaoCobraY) {
                velocidadeCobraX = velocidadeCobraY = 0;
                cauda = 5;
                pontuacao(0);
            }
        }

        rastro.push({ x: posicaoCobraX, y: posicaoCobraY })
        while (rastro.length > cauda) {
            rastro.shift();
        }

        if (posicaoMacaX == posicaoCobraX && posicaoMacaY == posicaoCobraY) {
            cauda++;
            pontuacao();
            posicaoMacaX = Math.floor(Math.random() * quantidadePecas);
            posicaoMacaY = Math.floor(Math.random() * quantidadePecas);
        }

    }

    function pontuacao(zerar) {
        var pontuacao = document.getElementById("pontuacao")

        if (zerar == 0)
            pontuacao.innerText = 0
        else {
            var pontos = parseInt(pontuacao.innerText) + 5

            pontuacao.innerText = pontos
        }
    }

    function keyPush(event) {

        switch (event.keyCode) {
            case 37: // Left
                if (velocidadeCobraX != velocidade)
                    velocidadeCobraX = -velocidade;
                velocidadeCobraY = 0;
                break;
            case 38: // up
                velocidadeCobraX = 0;
                if (velocidadeCobraY != velocidade)
                    velocidadeCobraY = -velocidade;
                break;
            case 39: // right
                if (velocidadeCobraX != -velocidade)
                    velocidadeCobraX = velocidade;
                velocidadeCobraY = 0;
                break;
            case 40: // down
                velocidadeCobraX = 0;
                if (velocidadeCobraY != -velocidade)
                    velocidadeCobraY = velocidade;
                break;
            default:
                break;
        }
    }
}