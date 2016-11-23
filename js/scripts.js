var socket = io();
$('.activeLed').click(function() {
	var codemachine = getMachine();
	var color = $(this).val();

	$('.activeLed').removeClass("btn-danger");
	$('.activeLed').removeClass("btn-primary");
	$('.activeLed').removeClass("btn-success");

	if (color == 'red') {
		$(this).addClass("btn-danger");
	} else if (color == 'blue') {
		$(this).addClass("btn-primary");
	} else if (color == 'green') {
		$(this).addClass("btn-success");
	}

	//EMITE WEBSCOKET PARA LIGAR O LED
	socket.emit('servidor:ligarled', codemachine, color);

	return false;
});

$('.desactiveLed').click(function() {
	var codemachine = getMachine();

	//EMITE WEBSCOKET PARA LIGAR DESLIGAR O LED
	socket.emit('servidor:desligarled', codemachine);

	return false;
});

//ESCUTA DO WEBSOCKET AGUARDANDO ACAO
socket.on('machine:server_talk', function(msg) {
	$('#mensagens').append($('<li>').text(msg));
});

function getMachine(){
	return $('#codemachine').val();
}