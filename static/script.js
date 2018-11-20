
//Load jugadores from server
function loadJugadores(callback) {
    $.ajax({
        url: 'http://localhost:8080/jugadores'
    }).done(function (jugadores) {
        console.log('Jugadores loaded: ' + JSON.stringify(jugadores));
        callback(jugadores);
    })
}

//Create jugador in server
function createJugador(jugador, callback) {
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/jugadores',
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
        url: 'http://localhost:8080/jugadores/' + jugador.ip,
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
        url: 'http://localhost:8080/jugadores/' + jugadorIp
    }).done(function (jugador) {
        console.log("Deleted jugadores " + jugadorIp)
    })
}

//Show jugador in page
function showJugador(jugador) {

    var checked = '';
    var style = '';

    if (jugador.conectado) {
        checked = 'checked';
        style = 'style="text-decoration:line-through"';
    }
    /*
    $('#info').append(
        '<div id="jugador-' + jugador.ip + '"><input type="checkbox" ' + checked + '><span ' + style + '>' + jugador.nombre +
        '</span> <button>Delete</button></div>')
        */    
}

$(document).ready(function () {
	
    loadJugadores(function (jugadores) {
    	var num = 0;
        //When jugadores are loaded from server
        for (var i = 0; i < jugadores.length; i++) {
            num++;
        	showJugador(jugadores[i]);
        }
        $('#numplayers').append('<div id="jugadores conectados:">'+"Jugadores conectados: "+ num +'</div>')
    });

    var input = $('#value-input')
    var info = $('#info')

    //Handle delete buttons
    info.click(function (event) {
        var elem = $(event.target);
        if (elem.is('button')) {
            var jugadorDiv = elem.parent();
            var jugadorIp = jugadorDiv.attr('id').split('-')[1];
            jugadorDiv.remove()
            deleteJugador(jugadorIp);
        }
    })

    //Handle jugadores checkboxs
    info.change(function (event) {

        //Get page elements for jugador
        var checkbox = $(event.target);
        var jugadorDiv = checkbox.parent();
        var textSpan = jugadorDiv.find('span');

        //Read jugador info from elements
        var jugadorDescription = textSpan.text();
        var jugadorChecked = checkbox.prop('checked');
        var jugadorIp = jugadorDiv.attr('ip').split('-')[1];

        //Create updated jugador
        var updatedJugador = {
            ip: jugadorIp,
            nombre: jugadorDescription,
            conectado: jugadorChecked
        }

        //Update jugador in server
        updateJugador(updatedJugador);

        //Update page when conectado
        var style = jugadorChecked ? 'line-through' : 'none';
        textSpan.css('text-decoration', style);

    })

    //Handle add button
    $("#add-button").click(function () {
    	
        var value = input.val();
        input.val('');

        var jugador = {
            nombre: value,
            conectado: true
        }
        
        createJugador(jugador, function (jugadorWithIp) {
            //When jugador with ip is returned from server
            showJugador(jugadorWithIp);
        });
    })
    
    //Cuenta jugadores
    $(document).ready(function (jugadores) {
    	//var refreshId =  setInterval( function(){
    		//$('#numplayers').append('<div id="jugadores conectados:">'+"Jugadores conectados: "+ jugadores.length +'</div>');//actualizas el div
    	   //}, 1000 );
       
    })
})