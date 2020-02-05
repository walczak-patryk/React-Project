package central.app.backend.centralapp.controllers;

import central.app.backend.centralapp.errors.ErrorResponse;
import central.app.backend.centralapp.exceptions.UnauthorizedAccessException;
import central.app.backend.centralapp.exceptions.UrlNotRespondException;
import central.app.backend.centralapp.forms.parklyForms.ParklyBookingForm;
import central.app.backend.centralapp.forms.parklyForms.ParklyForm;
import central.app.backend.centralapp.forms.parklyForms.ParklySpotForm;
import central.app.backend.centralapp.models.Booking;
import central.app.backend.centralapp.models.User;
import central.app.backend.centralapp.services.ParklyService;
import central.app.backend.centralapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping(path = "/parkly")
public class ParkingController {
    private ParklyService parklyService;

    @Autowired
    private UserService userService;

    @Autowired
    public ParkingController(ParklyService parklyService) {
        this.parklyService = parklyService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("")
    public ResponseEntity<List<ParklyForm>> getAllParkings() throws Exception {
        return ResponseEntity.ok().body(parklyService.getAllParkings());
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/spots")
    public ResponseEntity<List<ParklySpotForm>> getAllParkingSpots() throws Exception {
        return ResponseEntity.ok().body(parklyService.getAllParkingSpots());
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PostMapping("")
    public ResponseEntity<ParklyBookingForm> createBooking(@Valid @RequestBody ParklyBookingForm parklyBookingForm,
                                                           @RequestHeader ("Authorization") String requestAuthorizationHeader) throws Exception{
        String token = requestAuthorizationHeader.substring(7);
        User currentUser = userService.getUserByToken(token);
        parklyBookingForm.setUserId(currentUser.getId());
        return ResponseEntity.ok().body(parklyService.createBooking(parklyBookingForm));
    }

    @ExceptionHandler({UnauthorizedAccessException.class})
    public ResponseEntity<ErrorResponse> exception(UnauthorizedAccessException ex) {
        return new ResponseEntity<>(
                new ErrorResponse("Parkly Access Denied.", HttpStatus.CONFLICT.value(), ex.getMessage()),
                HttpStatus.CONFLICT);
    }

    @ExceptionHandler({UrlNotRespondException.class})
    public ResponseEntity<ErrorResponse> exception(UrlNotRespondException ex) {
        return new ResponseEntity<>(
                new ErrorResponse("Parkly Does Not Respond Exception.", HttpStatus.BAD_REQUEST.value(), ex.getMessage()),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<ErrorResponse> accessDenied(AccessDeniedException ex){
        return new ResponseEntity<>(
                new ErrorResponse("Access denied. You don't have enough permissions.", HttpStatus.FORBIDDEN.value(), ex.getMessage()),
                HttpStatus.FORBIDDEN);
    }
}
