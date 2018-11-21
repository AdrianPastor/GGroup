package es.urjc.code.juegosenred;

public class Jugador {

	private long ip;
	private String nombre;
	private boolean conectado;

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

	public boolean getConectado() {
		return conectado;
	}

	public void setConectado(boolean conectado) {
		this.conectado = conectado;
	}

	@Override
	public String toString() {
		return "Jugador [ip=" + ip + ", nombre=" + nombre + ", conectado=" + conectado + "]";
	}

}
