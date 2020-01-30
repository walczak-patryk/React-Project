package central.app.backend.centralapp.exceptions;

public class InvalidConnectionException extends RuntimeException{
    public InvalidConnectionException(String message) {super(message);}
    public InvalidConnectionException() { this("Invalid Connection"); }
}
