// var botao = document.getElementById resumiu até o cadastrar;
var comecou = false;
var letrasChutadas = [];
var palavra = "";
var erro = 0;

$("#cadastro button").click(function (event) {
    event.preventDefault();
    // Declarar variavel palavra com o valor do input
    palavra = $("#palavra").val();
    //Verificar se o campo esta vazio
    if (palavra === "") {
        //Se estiver vazio mostra uma msg de erro
        alert("Por favor prencha o campo!");
    } else {
        //Se não estiver vazio montar os undelines
        for (i = 0; i < palavra.length; i++) {
            var span = $("<span>" + palavra[i] + "</span>");
            span.appendTo(".letras");

        }
        //Se não estiver vazio mostrar tela da forca

        //Adicionar classe "visivel" na tela da forca
        $("#forca").addClass("visivel");
        //Remover a classe na tela do cadastro
        $("#cadastro").removeClass("visivel");
        //BUG FIX (APARECIA TUDO QUE A PESSOA DIGITOU)
        comecou = true;
    }

});

$(document).keydown(function (event) {

    if (comecou) {
        var letra = event.key;
        if (letra.length > 1) {
            return;
        }
        //Vai verificar se a letra ja foi utilizada (fazer com que a pessoa não fique chutando as mesmas letras)
        if (letrasChutadas.indexOf(letra) != -1) {
            return;
        }
        //Registrar a letra ultilizada
        letrasChutadas.push(letra);
        var span = $("<span>" + letra + "</span>");
        span.appendTo(".letras-usadas");

        //Letra existe na palavra cadastrada?
        if (palavra.indexOf(letra) != -1) {
            //Se sim 
            //mostra no campo a letra correspondente
            for (var i = 0; i < palavra.length; i++) {
                var letra2 = palavra[i];
                if (letra == letra2) {
                    //i é o indice temos que mostrar na tela
                    $(".letras span").eq(i).addClass("visivel");
                }
            }
            //Se a palavra estiver completa
            if ($(".letras span:not(.visivel)").length == 0) {
                // mostra o final correto
                $("#ganhou").addClass("visivel");
                $("#forca").removeClass("visivel");
            }

        } else {
            //Se não
            //mostra o membro do boneco
            $(".corpo *").eq(erro).attr("class", "st0 visivel");
            erro++;
            //se excedeu as tentativas
            if (erro == 6) {
                $("#perdeu").addClass("visivel");
                $("#forca").removeClass("visivel");
            }
        }
    }
});

$(".btn-recomecar").click(function (event) {
    $("#cadastro").addClass("visivel");
    $("#perdeu").removeClass("visivel");
    $("#ganhou").removeClass("visivel");
});
