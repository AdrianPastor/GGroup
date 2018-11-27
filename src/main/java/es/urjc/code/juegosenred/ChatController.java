package es.urjc.code.juegosenred;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.Map;
import java.util.Scanner;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chats")
public class ChatController {

	Map<Long, Chat> chats = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);
	boolean confirmado=false;
	String newUser = "";
	
		
	public void carga() throws IOException
	{
		File fichero = new File("C:\\Users\\maris\\Desktop\\GGroup-3.0\\src\\main\\resources\\static\\juego\\chatinfo.txt");
		Scanner s = null;
		s = new Scanner(fichero);
		String linea="";
		while (s.hasNextLine()) 
		{
			linea = s.nextLine();
		}
		newUser = linea;
		s.close();
	}
	
	@GetMapping
	public Collection<Chat> chats() throws IOException
	{	
		if(confirmado==false)
		{
			carga();
			confirmado = true;
		}
		return chats.values();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Chat nuevoChat(@RequestBody Chat chat) {
		
		long id = nextId.incrementAndGet();
		chat.setId(id);
		chat.setValue(newUser);
		chat.setUser(newUser);
		chats.put(id, chat);
		return chat;
		
	}

	@PutMapping("/{id}")
	public ResponseEntity<Chat> actulizaChat(@PathVariable long id, @RequestBody Chat chatActualizado) {

		Chat savedChat = chats.get(chatActualizado.getId());

		if (savedChat != null) {

			chats.put(id, chatActualizado);

			return new ResponseEntity<>(chatActualizado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Chat> getChat(@PathVariable long id) {

		Chat savedChat = chats.get(id);

		if (savedChat != null) {
			return new ResponseEntity<>(savedChat, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Chat> borraChat(@PathVariable long id) {

		Chat savedChat = chats.get(id);

		if (savedChat != null) {
			chats.remove(savedChat.getId());
			return new ResponseEntity<>(savedChat, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
