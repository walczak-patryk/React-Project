package central.app.backend.centralapp.services;

import central.app.backend.centralapp.exceptions.UnauthorizedAccessException;
import central.app.backend.centralapp.exceptions.UrlNotRespondException;
import central.app.backend.centralapp.forms.LoginForm;
import central.app.backend.centralapp.forms.parklyForms.ParklyBookingForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParklyService {

    @Autowired
    private final ConnectionService connectionService;
    private String urlToParkly;
    private LoginForm loginForm;


    public ParklyService(ConnectionService connectionService) {
        this.connectionService = connectionService;
        this.urlToParkly = "http://parklybe.us-east-1.elasticbeanstalk.com/";
        this.loginForm = new LoginForm( "bookly","bkl");
    }

    public ParklyBookingForm[] getAllBookings() throws Exception {
        this.connectionService.connection(this.urlToParkly,this.loginForm);
        return this.connectionService.getRequest();
    }

    public ParklyBookingForm createBooking(ParklyBookingForm parklyBookingForm) throws Exception {
        this.connectionService.connection(this.urlToParkly,this.loginForm);
        return this.connectionService.postRequest(parklyBookingForm);
    }

    public void bookParking(ParklyBookingForm parkingBookingForm) throws Exception {
        this.connectionService.connection(this.urlToParkly,this.loginForm);
        this.connectionService.postRequest(parkingBookingForm);
    }

    public void releaseParking(int parkingId) throws Exception {
        this.connectionService.connection(this.urlToParkly,this.loginForm);
        this.connectionService.deleteRequest(parkingId);
    }
}