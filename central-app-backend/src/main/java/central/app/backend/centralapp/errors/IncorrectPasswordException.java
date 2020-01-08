package central.app.backend.centralapp.errors;

public class IncorrectPasswordException extends RuntimeException{
    public IncorrectPasswordException() {
        this("Incorrect password");
    }
    public IncorrectPasswordException(String message) {
        super(message);
    }
}
