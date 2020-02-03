package central.app.backend.centralapp.services;

import central.app.backend.centralapp.exceptions.UnauthorizedAccessException;
import central.app.backend.centralapp.exceptions.UrlNotRespondException;
import central.app.backend.centralapp.forms.LoginForm;
import central.app.backend.centralapp.forms.TokenForm;
import central.app.backend.centralapp.forms.parklyForms.ParklyBookingForm;
import central.app.backend.centralapp.forms.parklyForms.ParklyForm;
import central.app.backend.centralapp.forms.parklyForms.ParklySpotForm;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public List<ParklyForm> getAllParkings() throws Exception {
        this.connectionService.connection(this.urlToParkly,this.loginForm);
        List<ParklyForm> parklyFormsList = new ArrayList<>();
        String result = this.connectionService.getRequest("/Parking");
        try{
            parklyFormsList = new ObjectMapper().readValue(result, new TypeReference<List<ParklyForm>>(){});
        }catch(Exception ex){
            throw new UrlNotRespondException(ex.getMessage());
        }
        return parklyFormsList;
    }

    public List<ParklySpotForm> getAllParkingSpots() throws Exception {
        this.connectionService.connection(this.urlToParkly,this.loginForm);
        List<ParklySpotForm> parklySpotList = new ArrayList<>();
        String result = this.connectionService.getRequest("/ParkingSpot");
        try{
            parklySpotList = new ObjectMapper().readValue(result, new TypeReference<List<ParklySpotForm>>(){});
        }catch(Exception ex){
            throw new UrlNotRespondException(ex.getMessage());
        }
        return parklySpotList;
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