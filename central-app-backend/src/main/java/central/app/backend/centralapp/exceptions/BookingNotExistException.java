package central.app.backend.centralapp.exceptions;

public class BookingNotExistException extends RuntimeException {
    public BookingNotExistException() {
        this("Booking Does Not Exist");
    }
    public BookingNotExistException(String message) {
        super(message);
    }
}
