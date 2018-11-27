package es.urjc.code.juegosenred;

public class Jugador {

	private long ip;
	private String nombre;

	public Jugador() {
	}

	public long getIp() {
		return ip;
	}

	public void setIp(long ip) {
		this.ip = ip;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	@Override
	public String toString() {
		return "Jugador [ip=" + ip + ", nombre=" + nombre +"]";
	}

}
