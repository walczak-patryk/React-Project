package central.app.backend.centralapp.errors;

public class ErrorResponse {
    private String message;
    private int code;
    private String additionalInfo;

    public ErrorResponse(String message, int code, String additionalInfo) {
        this.message = message;
        this.code = code;
        this.additionalInfo = additionalInfo;
    }
}