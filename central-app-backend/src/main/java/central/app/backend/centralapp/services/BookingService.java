package central.app.backend.centralapp.services;

import central.app.backend.centralapp.models.Booking;
import central.app.backend.centralapp.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private BookingRepository bookingRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository){this.bookingRepository=bookingRepository; }

    public Booking createBooking(Booking booking)
    {
        Booking savedBooking=bookingRepository.save(booking);
        if(savedBooking == null)
        {

        }

        return savedBooking;
    }

    public List<Booking> getAllBookings(String filter)
    {
        List<Booking> allBookings;
        if(filter == null)
        {
            allBookings = bookingRepository.findAll();
        }
        else
        {
            if(!filter.equals("active")&&!filter.equals("inactive"))
            {

            }

            allBookings = bookingRepository.findByactive(true);
        }

        return allBookings;
    }
}
