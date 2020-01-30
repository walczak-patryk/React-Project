package central.app.backend.centralapp.exceptions;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException(String message) {super(message);}
    public InvalidTokenException() { this("Invalid Token Exception"); }
}
