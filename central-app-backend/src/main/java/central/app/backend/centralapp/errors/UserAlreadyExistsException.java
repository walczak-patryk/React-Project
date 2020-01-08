package central.app.backend.centralapp.errors;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException() {
        this("");
    }

    public UserAlreadyExistsException(String message) {
        super(message);
    }
}