package es.urjc.code.juegosenred;

public class Chat {

	private long id;
	private String value;
	private boolean checked;

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

	public boolean getChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	@Override
	public String toString() {
		return "Jugador [id=" + id + ", value=" + value + ", checked=" + checked + "]";
	}

}
