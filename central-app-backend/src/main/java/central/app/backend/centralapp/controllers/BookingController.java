package central.app.backend.centralapp.controllers;

import central.app.backend.centralapp.models.Booking;
import central.app.backend.centralapp.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path="")
public class BookingController {

    private BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService){ this.bookingService=bookingService; }

    @PostMapping("/bookings")
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody Booking booking)
    {

        return ResponseEntity.ok().body(bookingService.createBooking(booking));

    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings(@PathVariable (name="filter",required = false) String filter)
    {
        return ResponseEntity.ok().body(bookingService.getAllBookings(filter));

    }

}
