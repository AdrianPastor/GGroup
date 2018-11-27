
//Load jugadores from server
function loadJugadores(callback) {
    $.ajax({
        url: 'http://192.168.1.137:8080/jugadores'
    }).done(function (jugadores) {
        console.log('Jugadores loaded: ' + JSON.stringify(jugadores));
        callback(jugadores);
        loadJugadores(callback);
    })
}

//Create jugador in server
function createJugador(jugador, callback) {
    $.ajax({
        method: "POST",
        url: 'http://192.168.1.137:8080/jugadores',
        data: JSON.stringify(jugador),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (jugador) {
        console.log("Jugador created: " + JSON.stringify(jugador));
        callback(jugador);
    })
}

//Update jugador in server
function updateJugador(jugador) {
    $.ajax({
        method: 'PUT',
        url: 'http://192.168.1.137:8080/jugadores/' + jugador.ip,
        data: JSON.stringify(jugador),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (jugador) {
        console.log("Updated jugadores: " + JSON.stringify(jugador))
    })
}

//Delete jugador from server
function deleteJugador(jugadorIp) {
    $.ajax({
        method: 'DELETE',
        url: 'http://192.168.1.137:8080/jugadores/' + jugadorIp
    }).done(function (jugador) {
        console.log("Deleted jugadores " + jugadorIp)
    })
}

//Show jugador in page
function showJugador(jugador) {

    var checked = '';
    var style = '';
    
         
}

$(document).ready(function () {
	
    loadJugadores(function (jugadores) {
    	var num = 0;
        //When jugadores are loaded from server
        for (var i = 0; i < jugadores.length; i++) {
            num++;
        	//showJugador(jugadores[i]);
        }
        $('#numplayers').replaceWith('<div id="jugadores registrados:">'+"Jugadores registrados: "+ num +'</div>')
    });

    var input = $('#value-input')
    var info = $('#info')

    //Handle add button
    $("#add-button").click(function () {
    	
        var value = input.val();
        input.val('');

        var jugador = {
            nombre: value
        }
        
        createJugador(jugador, function (jugadorWithIp) {
            //When jugador with ip is returned from server
            showJugador(jugadorWithIp);
        });
    })
    
    //Cuenta jugadores
    $(document).ready(function (jugadores) {
    	/*var refreshId =  setInterval( function(){
    		$('#numplayers').replaceWith('<div id="jugadores conectados:">'+"Jugadores conectados: "+ num +'</div>');//actualizas el div
    	   }, 1000 );*/
       
    })
})