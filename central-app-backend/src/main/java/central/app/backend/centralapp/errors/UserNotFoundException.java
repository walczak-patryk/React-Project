package central.app.backend.centralapp.errors;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() {
        this("");
    }

    public UserNotFoundException(String message) {
        super(message);
    }
}
