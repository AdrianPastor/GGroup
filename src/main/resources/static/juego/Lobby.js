var Gentleball = Gentleball || {};

var fondo;
var play;
var LobbyText;
var exit;
var servidorapagado=false;
var info='';
var jugadoreslista;
var serveroff;
var botonserveroff;

var currentJugador;


var input = document.getElementById('valueinput');

var bot = document.getElementById('add-but');

var bot2 = document.getElementById('send-btn');

var mensaje = document.getElementById('message');



input.style.display = 'none';
bot.style.display = 'none';
bot2.style.display = 'none';
mensaje.style.display = 'none';

var ipserver;
ipserver = prompt('Introduzca la ip del servidor:','192.168.1.40:8080');


var iplocal;

$.getJSON('https://api.ipify.org?format=json', function(data){
    console.log(data.ip);
	iplocal=data.ip;
});

Gentleball.Lobby = function(){};

Gentleball.Lobby.prototype = {
	create: function() 
  	{
		
		
		
  		this.game.world.setBounds(0, 0, 1000, 500);

    	//background
    	this.background = this.game.add.tileSprite(0, 0, 1000, 500, 'Fondo');

        LobbyText = this.game.add.tileSprite(this.game.world.centerX-125, this.game.world.centerY-250, 250, 150, 'LobbyText');
    	
        play = this.game.add.button(this.game.world.centerX-115, this.game.world.centerY+100,'BotonPlay', this.actionOnClick1, this,1,0);
        
        exit = this.game.add.button(947.36, 13.16, 'exit', this.actionOnClick2, this, 1, 0);
       
        var style = {font: "bold 38px 'VT323'", fill: "#000000", align: "left" };
        jugadoreslista = this.game.add.text(50, 70,info, style);
        
        serveroff = this.game.add.sprite(167, 84, 'serveroff');
        serveroff.visible=false;
        
        botonserveroff = this.game.add.button(374, 255, 'botonserveroff', this.actionOnClick3, this, 1, 0);
        botonserveroff.visible=false;
        
        
        
        
        
        input.style.display = '';
        bot.style.display = '';
        
        
        setInterval(loadJugadores,3000);
  	},
  	
  	update: function()
  	{
  		if(servidorapagado==false)
  		{
  			
  		}
  		else
  		{
  			serveroff.visible=true;
  			botonserveroff.visible=true;
  		}
  		
  		jugadoreslista.setText(info);
  	},

  actionOnClick1: function () 
  {
    this.game.state.start('Game');
    input.style.display = 'none';
    bot.style.display = 'none';
    bot2.style.display = 'none';
    mensaje.style.display = 'none';
 ;
  },
  
  actionOnClick2: function () 
  {
	 deleteJugador(currentJugador.nombre);
    this.game.state.start('Tipo');
    input.style.display = 'none';
    bot.style.display = 'none';
    bot2.style.display = 'none';
    mensaje.style.display = 'none';
  },
  
  actionOnClick3: function () 
  {
	menu.destroy();
	deleteJugador(currentJugador.nombre);
    this.game.state.start('MainMenu');
    input.style.display = 'none';
    bot.style.display = 'none';
    bot2.style.display = 'none';
    mensaje.style.display = 'none';
  },
  


};



//Load jugadores from server
function loadJugadores(callback) {
    $.ajax({
        url: 'http://'+ipserver+'/jugadores'
    }).done(function (jugadores){
        console.log('Jugadores loaded: ' + JSON.stringify(jugadores));
        info='Jugadores:\n';
        for(var i=0; i<jugadores.length; i++)
        {
        	var jugador=jugadores[i];
        	
        	info +="- "+ jugador.nombre+"\n";
        }
        if (callback) 
		{
		    callback(jugadores);
		}
		servidorapagado=false;
    }).fail(function (){
		console.error("Se ha perdido la conexion con el servidor");
		servidorapagado=true;
	})
}

//Create jugador in server
function createJugador(jugador, callback) {
    $.ajax({
        method: "POST",
        url: 'http://'+ipserver+'/jugadores',
        data: JSON.stringify(jugador),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (jugador) {
        console.log("Jugador created: " + JSON.stringify(jugador));
        callback(jugador);
        input.style.display = 'none';
        bot.style.display = 'none';
        bot2.style.display = '';
        mensaje.style.display = '';
    })
}

//Update jugador in server
function updateJugador(jugador) {
    $.ajax({
        method: 'PUT',
        url: 'http://'+ipserver+'/jugadores/' + jugador.ip,
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
        url: 'http://'+ipserver+'/jugadores/' + jugadorIp
    }).done(function (jugador) {
        console.log("Deleted jugadores " + jugadorIp)
    })
}



$(document).ready(function () 
{
	
    loadJugadores(function (jugadores) 
    {
        
    });

    var input = $('#valueinput');
    

    //Handle add button
    $("#add-but").click(function () 
    {
    	console.log(iplocal);
        var value = input.val();

        var jugador = {
        	ip: iplocal,
            nombre: value
        }
        
        createJugador(jugador, function (userWithId) {
            currentJugador = userWithId;
        });
    })
    
})

$(document).ready(function(){
	var connection = new WebSocket('ws://'+ipserver+'/echo');
	connection.onerror = function(e) {
	  console.log("WS error: " + e);
	}
	connection.onmessage = function(msg) {
	  console.log("WS message: " + msg.data);
	}
    $('#send-btn').click(function() {
    	var object = {
    			valueinput : $(input).val(),
    			message : $('#message').val()	
    	}
	    connection.send(JSON.stringify(object));
    });
})

