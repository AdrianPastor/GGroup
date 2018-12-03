var Gentleball = Gentleball || {};

var fondo;
var play;
var LobbyText;


var ipserver;
var usuario;
ipserver = prompt('Introduzca la ip del servidor:','192.168.1.1:8080');
usuario = prompt('Introduzca su nombre de usuario','');


Gentleball.Lobby = function(){};

Gentleball.Lobby.prototype = {
	create: function() 
  	{
  		this.game.world.setBounds(0, 0, 1000, 500);

    	//background
    	this.background = this.game.add.tileSprite(0, 0, 1000, 500, 'Fondo');
        

        LobbyText = this.game.add.tileSprite(this.game.world.centerX-125, this.game.world.centerY-250, 250, 150, 'LobbyText');
    	
        play = this.game.add.button(this.game.world.centerX-115, this.game.world.centerY+100,'BotonPlay', this.actionOnClick1, this,1,0);
 
        setInterval(loadChats,3000);
  	},

  actionOnClick1: function () 
  {
    this.game.state.start('Game'); 
  },

};

$.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
	  console.log(JSON.stringify(data, null, 2));
	});

//Cargar chats del servidor
function loadChats(callback){
	$.ajax({
		url: 'http://'+ipserver+'/chats'
	}).done(function(chats){
		console.log('Chats loaded: ' + JSON.stringify(chats));
		if (callback) 
		{
		    callback(chats);
		}
	})
}

//Crear chat en el servidor
function createChat(chat, callback){
	$.ajax({
		method: "POST",
		url: 'http://'+ipserver+'/chats',
		data: JSON.stringify(chat),
		processData: false,
		headers: {
			"Content-Type": "application/json"
		}
	}).done(function(chat){
		console.log("Chat created" + JSON.stringify(chat));
		callback(chat);
	})
}

//Actualizar chat en el servidor
function updateChat(chat) {
    $.ajax({
        method: 'PUT',
        url: 'http://'+ipserver+'/chats/'+chat.id,
        data: JSON.stringify(chat),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (chat) {
        console.log("Updated chat: " + JSON.stringify(chat))
    })
}

//Borrar chat del servidor
function deleteChat(chatId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://'+ipserver+'/chats/'+chatId
    }).done(function (chat) {
        console.log("Se borro el chat "+chatId)
    })
}

//Show Chat in page
function showChat(chat) {

    var checked = '';
    var style = '';
    
    $('#mensaje').append('<div id="chat-'+chat.id+'"><span '+style+'>'+usuario+": "+chat.value+'</span>')
}

$(document).ready(function () {
	var ref=0;
    loadChats(function (chats) {   	
        //When Chats are loaded from server
        for (var i = ref; i < chats.length; i++) 
        {
            showChat(chats[i]);
        }
        ref=chats.length;
    });

    var input = $('#value-input')
    var mensaje = $('#mensaje')

    //Handle delete buttons
    mensaje.click(function (event) {
        var elem = $(event.target);
        if (elem.is('button')) {
            var chatDiv = elem.parent();
            var chatId = chatDiv.attr('id').split('-')[1];
            chatDiv.remove()
            deleteChat(chatId);
        }
    })

    //Handle Chats checkboxs
    mensaje.change(function (event) {

        //Get page elements for Chat
        var chatDiv = checkbox.parent();
        var textSpan = chatDiv.find('span');

        //Read Chat mensaje from elements
        var chatDescription = textSpan.text();
        var chatId = chatDiv.attr('id').split('-')[1];

        //Create updated Chat
        var updatedChat = {
            id: chatId,
            value: chatDescription,
        }

        //Update Chat in server
        updateChat(updatedChat);

        //Update page when checked
        var style = chatChecked ? 'line-through' : 'none';
        textSpan.css('text-decoration', style);

    })

    //Handle add button
    $("#add-but").click(function () {

        var valor = input.val();
        input.val('');

        var chat = {
            value: valor
        }

        createChat(chat, function (chatWithId) {
            //When Chat with id is returned from server
            showChat(chatWithId);
            ref++;
        });
    })
})

