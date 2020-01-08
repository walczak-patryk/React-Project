package central.app.backend.centralapp.services;

import central.app.backend.centralapp.models.Booking;
import central.app.backend.centralapp.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    private BookingRepository bookingRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository){this.bookingRepository=bookingRepository; }

    public ResponseEntity<Booking>createBooking(Booking booking)
    {
        Booking savedBooking=bookingRepository.save(booking);
        return ResponseEntity.ok().body(savedBooking);
    }
}
