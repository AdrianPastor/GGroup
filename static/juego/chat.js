//Cargar chats del servidor
function loadChats(callback){
	$.ajax({
		url: 'http://192.168.1.137:8080/chats'
	}).done(function(chats){
		console.log('Chats loaded: ' + JSON.stringify(chats));
		callback(chats);
	})
}

//Crear chat en el servidor
function createChat(chat, callback){
	$.ajax({
		method: "POST",
		url: 'http://192.168.1.137:8080/chats',
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
        url: 'http://192.168.1.137:8080/chats/' + chat.id,
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
        url: 'http://192.168.1.137:8080/chats/' + chatId
    }).done(function (chat) {
        console.log("Se borro el chat " + chatId)
    })
}

//Show Chat in page
function showChat(chat) {

    var checked = '';
    var style = '';

    if (chat.checked) {
        checked = 'checked';
        style = 'style="text-decoration:line-through"';
    }
    
    $('#mensaje').append(
    	'<div id="chat-' + chat.id + '"><span ' + style + '>' + chat.value +
        '</span>')
}

$(document).ready(function () {

    loadChats(function (chats) {
        //When Chats are loaded from server
        for (var i = 0; i < chats.length; i++) {
            showChat(chats[i]);
        }
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
        var checkbox = $(event.target);
        var chatDiv = checkbox.parent();
        var textSpan = chatDiv.find('span');

        //Read Chat mensaje from elements
        var chatDescription = textSpan.text();
        var chatChecked = checkbox.prop('checked');
        var chatId = chatDiv.attr('id').split('-')[1];

        //Create updated Chat
        var updatedChat = {
            id: chatId,
            value: chatDescription,
            checked: chatChecked
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
            value: valor,
            checked: false
        }

        createChat(chat, function (chatWithId) {
            //When Chat with id is returned from server
            showChat(chatWithId);
        });
    })
})