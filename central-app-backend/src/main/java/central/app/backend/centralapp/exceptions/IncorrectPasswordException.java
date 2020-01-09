package central.app.backend.centralapp.exceptions;

public class IncorrectPasswordException extends RuntimeException{
    public IncorrectPasswordException() {
        this("Incorrect password");
    }
    public IncorrectPasswordException(String message) {
        super(message);
    }
}
