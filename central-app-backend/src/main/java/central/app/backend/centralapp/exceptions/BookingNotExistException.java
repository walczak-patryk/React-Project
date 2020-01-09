package central.app.backend.centralapp.exceptions;

public class BookingNotExistException extends RuntimeException {
    public BookingNotExistException() {
        this("");
    }
    public BookingNotExistException(String message) {
        super(message);
    }
}
