package central.app.backend.centralapp.exceptions;

public class InvalidToken extends RuntimeException {
    public InvalidToken(String message) {super(message);}
    public InvalidToken() { this("Invalid Token Exception"); }
}
