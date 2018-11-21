package es.urjc.code.juegosenred;

import java.util.Collection;
import java.util.Map;
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
@RequestMapping("/jugadores")
public class JugadorController {

	Map<Long, Jugador> jugadores = new ConcurrentHashMap<>(); 
	AtomicLong nextIp = new AtomicLong(0);
	
	@GetMapping
	public Collection<Jugador> jugadores() {
		return jugadores.values();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Jugador nuevoJugador(@RequestBody Jugador jugador) {
		
		long ip = nextIp.incrementAndGet();
		jugador.setIp(ip);
		jugadores.put(ip, jugador);
		return jugador;
		
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
