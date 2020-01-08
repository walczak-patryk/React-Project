package central.app.backend.centralapp.controllers;

import central.app.backend.centralapp.models.Booking;
import central.app.backend.centralapp.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path="")
public class BookingController {

    private BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService){ this.bookingService=bookingService; }

    @PostMapping("/bookings")
    public ResponseEntity<Booking> create(@Valid @RequestBody Booking booking)
    {

        return bookingService.createBooking(booking);

    }

}
