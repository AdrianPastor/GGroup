package es.urjc.code.juegosenred;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
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

	Map<Long, Jugador> jugadores = new HashMap<Long, Jugador>();
	long nextIp = -1;
	File fichero = new File("jugadores.txt");
	
	@GetMapping
	public Collection<Jugador> jugadores() throws FileNotFoundException {
		long ip = -1;
		Scanner s = null;
		s = new Scanner(fichero);
		while (s.hasNextLine()) 
		{
			Jugador y = new Jugador();
			String linea = s.nextLine();
			y.setNombre(linea);
			ip++;
			y.setIp(ip);
			jugadores.put(ip, y);
		}
		s.close();
		nextIp=ip;
		return jugadores.values();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Jugador nuevoJugador(@RequestBody Jugador jugador) throws IOException {
		
		if(compruebajugador(jugador.getNombre())==false)
		{
			nextIp++;
			long ip = nextIp;
			jugador.setIp(ip);
			jugadores.put(ip, jugador);
			FileWriter fw = new FileWriter(fichero,true);
			PrintWriter pw = new PrintWriter(fw);
			pw.write(jugador.getNombre()+"\n");
			pw.close();
			fw.close();
			return jugador;
		}
		else
		{
			System.out.println("Ese nombre ya existe");
			return null;
		}
		
	}
	
	public boolean compruebajugador(String nombre)
	{
		boolean comprobacion=false;
		
		if(jugadores.containsValue(nombre))
		{
			comprobacion=true;
		}
		
		return comprobacion;
	}
	
	@PutMapping("/{ip}")
	public ResponseEntity<Jugador> actulizaJugador(@PathVariable long ip, @RequestBody Jugador jugadorActualizado) {

		Jugador savedJugador = jugadores.get(jugadorActualizado.getIp());

		if (savedJugador != null) {

			jugadores.put(ip, jugadorActualizado);

			return new ResponseEntity<>(jugadorActualizado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{ip}")
	public ResponseEntity<Jugador> getJugador(@PathVariable long ip) {

		Jugador savedJugador = jugadores.get(ip);

		if (savedJugador != null) {
			return new ResponseEntity<>(savedJugador, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{ip}")
	public ResponseEntity<Jugador> borraJugador(@PathVariable long ip) {

		Jugador savedJugador = jugadores.get(ip);

		if (savedJugador != null) {
			jugadores.remove(savedJugador.getIp());
			return new ResponseEntity<>(savedJugador, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
