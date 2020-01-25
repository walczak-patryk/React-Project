package central.app.backend.centralapp.controllers;

import central.app.backend.centralapp.errors.ErrorResponse;
import central.app.backend.centralapp.exceptions.BookingNotExistException;
import central.app.backend.centralapp.models.Booking;
import central.app.backend.centralapp.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/bookings")
public class BookingController {

    private BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("")
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody Booking booking) {
        return ResponseEntity.ok().body(bookingService.create(booking));
    }

    @GetMapping("")
    public ResponseEntity<List<Booking>> getAllBookings(@RequestParam(name = "filter", required = false) String filter,
                                                        @RequestParam(name = "user", required = false) Integer userId) {
        return ResponseEntity.ok().body(bookingService.getAll(filter, userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBooking(@PathVariable(value = "id") int id) {
        return ResponseEntity.ok().body(bookingService.get(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable(value = "id") int id) {
        return ResponseEntity.ok().body(bookingService.delete(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable(value = "id") int id, @Valid @RequestBody Booking booking) {
        return ResponseEntity.ok().body(bookingService.update(id, booking));
    }

    @ExceptionHandler({BookingNotExistException.class})
    public ResponseEntity<ErrorResponse> notFound(BookingNotExistException ex) {
        return new ResponseEntity<>(
                new ErrorResponse("Booking does not exists", HttpStatus.NOT_FOUND.value(), ex.getMessage()),
                HttpStatus.NOT_FOUND);
    }
}
