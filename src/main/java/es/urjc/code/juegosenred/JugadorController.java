package es.urjc.code.juegosenred;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

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
@RequestMapping("/jugadores")
public class JugadorController {

	Map<String, Jugador> jugadores = new HashMap<String, Jugador>();
	ArrayList<String> listaip = new ArrayList<String>();
	File fichero = new File("jugadores.txt");
	
	@GetMapping
	public Collection<Jugador> jugadores() throws FileNotFoundException 
	{
		return jugadores.values();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Jugador nuevoJugador(@RequestBody Jugador jugador) throws IOException 
	{
		
			jugadores.put(jugador.getNombre(), jugador);
			FileWriter fw = new FileWriter(fichero,true);
			PrintWriter pw = new PrintWriter(fw);
			pw.write(jugador.getNombre()+"\n");
			pw.close();
			fw.close();
			return jugador;
	}
	
	
	@PutMapping("/{ip}")
	public ResponseEntity<Jugador> actulizaJugador(@PathVariable String ip, @RequestBody Jugador jugadorActualizado) {

		Jugador savedJugador = jugadores.get(jugadorActualizado.getIp());

		if (savedJugador != null) {

			jugadores.put(ip, jugadorActualizado);

			return new ResponseEntity<>(jugadorActualizado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{ip}")
	public ResponseEntity<Jugador> getJugador(@PathVariable String ip) {

		Jugador savedJugador = jugadores.get(ip);

		if (savedJugador != null) {
			return new ResponseEntity<>(savedJugador, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{ip}")
	public ResponseEntity<Jugador> borraJugador(@PathVariable String ip) {

		Jugador savedJugador = jugadores.get(ip);

		if (savedJugador != null) {
			jugadores.remove(savedJugador.getIp());
			return new ResponseEntity<>(savedJugador, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
