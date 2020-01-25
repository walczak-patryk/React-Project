package central.app.backend.centralapp.services;

import central.app.backend.centralapp.forms.ParkingBookingForm;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Service
public class ParkingService {

    private final RestTemplate restTemplate;
    private String token;
    private String urlToParking;

    public ParkingService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder
                .setConnectTimeout(Duration.ofSeconds(500))
                .setReadTimeout(Duration.ofSeconds(500))
                .build();
        this.urlToParking="http://localhost:8080/bookings";//"http://parklybe.us-east-1.elasticbeanstalk.com";
//        HttpEntity<LoginForm> request = new HttpEntity<>(new LoginForm("username", "password"));
//        this.token =  this.restTemplate.postForObject(this.urlToParking, request, String.class);
        this.token = "token";
    }

    public String getParking() {
        return this.restTemplate.getForObject(this.urlToParking,String.class);
    }

    public void bookParking(ParkingBookingForm parkingBookingForm){
        HttpEntity<ParkingBookingForm> request = new HttpEntity<>(parkingBookingForm);
        this.restTemplate.postForObject(this.urlToParking, request, ParkingBookingForm.class);
    }

    public void releaseParking(int parkingId){
        this.restTemplate.delete(this.urlToParking + parkingId);
    }


}