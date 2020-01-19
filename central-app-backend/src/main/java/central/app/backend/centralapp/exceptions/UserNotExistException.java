package central.app.backend.centralapp.exceptions;

public class UserNotExistException extends RuntimeException {
    public UserNotExistException(String message) {
        super(message);
    }
    public UserNotExistException() { this("User Does Not Exist Exception"); }
}
