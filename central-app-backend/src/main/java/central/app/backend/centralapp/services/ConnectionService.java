package central.app.backend.centralapp.services;

import central.app.backend.centralapp.exceptions.InvalidConnectionException;
import central.app.backend.centralapp.exceptions.UnauthorizedAccessException;
import central.app.backend.centralapp.exceptions.UrlNotRespondException;
import central.app.backend.centralapp.forms.LoginForm;
import central.app.backend.centralapp.forms.TokenForm;
import central.app.backend.centralapp.forms.parklyForms.ParklyBookingForm;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Service
public class ConnectionService {

    private final RestTemplate restTemplate;
    private HttpHeaders headers;
    private String url;

    public ConnectionService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder
                .setConnectTimeout(Duration.ofSeconds(500))
                .setReadTimeout(Duration.ofSeconds(500))
                .build();

    }

    public void connection(String url, LoginForm loginForm) throws UnauthorizedAccessException {
        this.url = url;
        HttpEntity<LoginForm> request = new HttpEntity<>(loginForm);
        this.headers.setContentType(MediaType.APPLICATION_JSON);
        try {
            this.headers.set("Authorization", "Bearer " +
                    this.restTemplate.postForObject(this.url + "/admin", request, TokenForm.class).getToken());
        }catch (Exception ex){
            throw new UnauthorizedAccessException(ex.getMessage());
        }
    }

    public ParklyBookingForm[] getRequest() throws UrlNotRespondException {
        HttpEntity<String> entity = new HttpEntity<>("body", this.headers);
        ResponseEntity<ParklyBookingForm[]> responseEntity = this.restTemplate.exchange(this.url+"/Booking",
                HttpMethod.GET,
                entity,
                ParklyBookingForm[].class);
        if (!responseEntity.getStatusCode().is2xxSuccessful())
            throw new UrlNotRespondException(this.url);

        return responseEntity.getBody();
    }

    public ParklyBookingForm postRequest(ParklyBookingForm parklyBookingForm) throws UrlNotRespondException {
        HttpEntity<String> entity = new HttpEntity<>(parklyBookingForm.toString(), this.headers);
        ResponseEntity<ParklyBookingForm> responseEntity = this.restTemplate.exchange(this.url+"/Booking",
                HttpMethod.POST,
                entity,
                ParklyBookingForm.class);
        if (!responseEntity.getStatusCode().is2xxSuccessful())
            throw new UrlNotRespondException(this.url);

        return responseEntity.getBody();
    }

    public void deleteRequest(int parkingId){
        this.restTemplate.delete(this.url + parkingId);
    }


}