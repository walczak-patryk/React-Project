package central.app.backend.centralapp.services;

import central.app.backend.centralapp.exceptions.BookingNotExistException;
import central.app.backend.centralapp.forms.BookingForm;
import central.app.backend.centralapp.forms.PageForm;
import central.app.backend.centralapp.models.Booking;
import central.app.backend.centralapp.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class BookingService {

    private BookingRepository bookingRepository;
    private UserService userService;

    @Autowired
    public BookingService(BookingRepository bookingRepository, UserService userService) {
        this.bookingRepository = bookingRepository;
        this.userService = userService;
    }

    public Booking create(Booking booking) {
        return bookingRepository.save(booking);
    }

    private static <T> List<List<T>> getPages(Collection<T> c, Integer pageSize) {
        if (c == null)
            return Collections.emptyList();
        List<T> list = new ArrayList<>(c);
        if (pageSize == null || pageSize <= 0 || pageSize > list.size())
            pageSize = list.size();
        int numPages = (int) Math.ceil((double)list.size() / (double)pageSize);
        List<List<T>> pages = new ArrayList<>(numPages);
        for (int pageNum = 0; pageNum < numPages;)
            pages.add(list.subList(pageNum * pageSize, Math.min(++pageNum * pageSize, list.size())));
        return pages;
    }

    public PageForm getAll(String filter, Integer pageSize, Integer pageNumber) {
        List<Booking> bookings =  bookingRepository.findAll();
        int maxSize = 0;
        boolean isNext = false;
        List<BookingForm> bookingForms =  new ArrayList<>();
        for (Booking book:bookings ) {
            bookingForms.add(new BookingForm(book, userService.getUsername(book.getOwner())));
        }
        if (filter != null && filter.matches("active|inactive"))
            bookingForms.removeIf(booking -> booking.getActive() != filter.equals("active"));
        if(pageSize != null && pageNumber != null){
            pageNumber -= 1;
            if(pageSize > 0 && pageSize <= bookingForms.size()){
                maxSize = (int)Math.floor(bookingForms.size()/pageSize);
                if((bookingForms.size()%pageSize)!=0)
                    maxSize+=1;
            }
            if(pageSize > 0 && pageNumber >= 0 && pageSize <= bookingForms.size() && (pageNumber+1)<=maxSize){
                List<List<BookingForm>> page = getPages(bookingForms, pageSize);
                if(page.size()>pageNumber)
                    bookingForms = page.get(pageNumber);
                isNext = maxSize != (pageNumber + 1);
            }else {
                bookingForms.clear();
            }
        }
        PageForm pageForm = new PageForm(bookingForms,maxSize,isNext);
        return pageForm;

    }

    public BookingForm get(int id) {
        Booking booking = bookingRepository.findById(id);
        if (booking == null)
            throw new BookingNotExistException("Id " + id);
        return new BookingForm(booking,userService.getUsername(booking.getOwner()));
    }

    public String delete(int id) {
        Booking booking = bookingRepository.findById(id);
        if (booking == null)
            throw new BookingNotExistException("Id: " + id);
        bookingRepository.delete(booking);
        return "Booking Deleted";
    }

    public BookingForm update(int id, Booking userToUpdate) {
        Booking user = bookingRepository.findById(id);
        if (user == null)
            throw new BookingNotExistException("Id: " + id);
        user.setAll(userToUpdate);
        user = bookingRepository.save(user);
        return new BookingForm(user,userService.getUsername(user.getOwner()));
    }
}
