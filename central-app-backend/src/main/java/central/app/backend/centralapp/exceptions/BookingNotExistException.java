package central.app.backend.centralapp.exceptions;

public class BookingNotExistException extends RuntimeException {
    public BookingNotExistException(String message) {
        super(message);
    }
    public BookingNotExistException() { this("Booking Does Not Exist Exception"); }
}
