package central.app.backend.centralapp.exceptions;

public class UnauthorizedAccessException extends RuntimeException{
    public UnauthorizedAccessException() {
        this("Unauthorized Access");
    }
    public UnauthorizedAccessException(String message) {
        super(message);
    }
}