package central.app.backend.centralapp.services;

import central.app.backend.centralapp.exceptions.BookingNotExistException;
import central.app.backend.centralapp.models.Booking;
import central.app.backend.centralapp.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private BookingRepository bookingRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public Booking create(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAll(String filter, Integer userId) {
        List<Booking> bookings;
        if (userId != null)
            bookings = bookingRepository.findByOwner(userId);
        else
            bookings = bookingRepository.findAll();
        if (filter != null && filter.matches("active|inactive"))
            bookings.removeIf(booking -> booking.getActive() != filter.equals("active"));
        return bookings;
    }

    public Booking get(int id) {
        Booking booking = bookingRepository.findById(id);
        if (booking == null)
            throw new BookingNotExistException("Id " + id);
        return booking;
    }

    public String delete(int id) {
        Booking booking = bookingRepository.findById(id);
        if (booking == null)
            throw new BookingNotExistException("Id: " + id);
        bookingRepository.delete(booking);
        return "Booking Deleted";
    }

    public Booking update(int id, Booking userToUpdate) {
        Booking user = bookingRepository.findById(id);
        if (user == null)
            throw new BookingNotExistException("Id: " + id);
        user.setAll(userToUpdate);
        return bookingRepository.save(user);
    }
}
