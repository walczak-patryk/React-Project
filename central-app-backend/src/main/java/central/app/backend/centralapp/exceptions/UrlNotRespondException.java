package central.app.backend.centralapp.exceptions;

public class UrlNotRespondException extends Exception {
        public UrlNotRespondException(String message) { super(message); }
        public UrlNotRespondException() { this("Url Does Not Respond"); }
}
