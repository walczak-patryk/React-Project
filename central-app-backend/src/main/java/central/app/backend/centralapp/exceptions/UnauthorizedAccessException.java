package central.app.backend.centralapp.exceptions;

public class UnauthorizedAccessException extends RuntimeException{
    public UnauthorizedAccessException(String message) { super(message); }
    public UnauthorizedAccessException() { this("Unauthorized Access Exception"); }
}