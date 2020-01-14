package central.app.backend.centralapp.exceptions;

public class UserNotExistException extends RuntimeException {
    public UserNotExistException() {
        this("User Does Not Exist");
    }
    public UserNotExistException(String message) {
        super(message);
    }
}
