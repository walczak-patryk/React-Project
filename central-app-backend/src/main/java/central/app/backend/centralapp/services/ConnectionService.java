package central.app.backend.centralapp.services;

import central.app.backend.centralapp.exceptions.InvalidConnectionException;
import central.app.backend.centralapp.exceptions.UnauthorizedAccessException;
import central.app.backend.centralapp.exceptions.UrlNotRespondException;
import central.app.backend.centralapp.forms.LoginForm;
import central.app.backend.centralapp.forms.TokenForm;
import central.app.backend.centralapp.forms.parklyForms.ParklyBookingForm;
import central.app.backend.centralapp.forms.parklyForms.ParklyForm;
import central.app.backend.centralapp.forms.parklyForms.ParklySpotForm;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import static org.springframework.http.MediaType.*;

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
        this.headers = new HttpHeaders();
    }

    public void connection(String url, LoginForm loginForm) throws UnauthorizedAccessException {
        this.url = url;
        HttpEntity<LoginForm> request = new HttpEntity<LoginForm>( new LoginForm(loginForm));
        this.headers.setContentType(APPLICATION_JSON);
        try {

            this.headers.set("Authorization", "Bearer " +
                    Objects.requireNonNull(this.restTemplate.postForObject(this.url + "/login", request, TokenForm.class)).getToken());
        }catch (Exception ex){
            throw new UnauthorizedAccessException(ex.getLocalizedMessage());
        }
    }

    public List<ParklyForm> getRequestParklyForm(String endpoint) throws UrlNotRespondException {
        HttpEntity<String> entity = new HttpEntity<String>("body", this.headers);
        ResponseEntity<ParklyForm[]> responseEntity = this.restTemplate.exchange(this.url+endpoint,
                HttpMethod.GET,
                entity,
                ParklyForm[].class);
        if (!responseEntity.getStatusCode().is2xxSuccessful() || !responseEntity.hasBody() || responseEntity.getBody() == null)
            throw new UrlNotRespondException(this.url);
        return Arrays.asList(responseEntity.getBody());
    }

    public List<ParklySpotForm> getRequestParklySpot(String endpoint) throws UrlNotRespondException {
        HttpEntity<String> entity = new HttpEntity<String>("body", this.headers);
        ResponseEntity<ParklySpotForm[]> responseEntity = this.restTemplate.exchange(this.url+endpoint,
                HttpMethod.GET,
                entity,
                ParklySpotForm[].class);
        if (!responseEntity.getStatusCode().is2xxSuccessful() || !responseEntity.hasBody() || responseEntity.getBody() == null)
            throw new UrlNotRespondException(this.url);
        return Arrays.asList(responseEntity.getBody());
    }

    public ParklyBookingForm postRequestParklyBooking(String endpoint, ParklyBookingForm parklyBookingForm) throws UrlNotRespondException {
        HttpEntity<String> entity = new HttpEntity<String>(parklyBookingForm.toString(), this.headers);
        ResponseEntity<ParklyBookingForm> responseEntity = this.restTemplate.exchange(this.url+"/booking",
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