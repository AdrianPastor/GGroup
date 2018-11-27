package es.urjc.code.juegosenred;

public class Chat {

	private long id;
	private String value;
	private String user;

	public Chat() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Jugador [id=" + id + ", value=" + value + ", user=" + user + "]";
	}

}
