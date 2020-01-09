package central.app.backend.centralapp.services;

import central.app.backend.centralapp.exceptions.BookingNotExistException;
import central.app.backend.centralapp.models.Booking;
import central.app.backend.centralapp.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    private BookingRepository bookingRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public Booking createBooking(Booking booking) {
        Booking savedBooking = bookingRepository.save(booking);
//        if (savedBooking == null) {
//
//        }

        return savedBooking;
    }

//    public List<Booking> getAllBookings(String filter)
//    {
//        List<Booking> allBookings;
////        if(filter == null)
////        {
////            allBookings = bookingRepository.findAll();
////        }
////        else
////        {
////            if(!filter.equals("active")&&!filter.equals("inactive"))
////            {
////
////            }
////
////            allBookings = bookingRepository.findByactive(true);
////        }
////
//        return allBookings;
//    }

    public Booking getBooking(int id) {
        Booking booking = bookingRepository.findById(id);
        if (booking == null)
            throw new BookingNotExistException("Id " + id);
        return booking;
    }
}
