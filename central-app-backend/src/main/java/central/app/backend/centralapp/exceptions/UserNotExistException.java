package central.app.backend.centralapp.exceptions;

public class UserNotExistException extends RuntimeException {
    public UserNotExistException() {
        this("");
    }
    public UserNotExistException(String message) {
        super(message);
    }
}
