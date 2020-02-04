package central.app.backend.centralapp.services;

import central.app.backend.centralapp.exceptions.BookingNotExistException;
import central.app.backend.centralapp.exceptions.UnauthorizedAccessException;
import central.app.backend.centralapp.forms.BookingForm;
import central.app.backend.centralapp.forms.PageForm;
import central.app.backend.centralapp.models.Booking;
import central.app.backend.centralapp.models.User;
import central.app.backend.centralapp.repositories.BookingRepository;
import central.app.backend.centralapp.repositories.UserRepository;
import central.app.backend.centralapp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.time.LocalDate;

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

    public PageForm getAll(String filter,String itemType,String dateFromString,String dateToString,String username, Integer pageSize, Integer pageNumber, User currentUser) {
        List<Booking> bookings;
        if (currentUser.getRole().equals("USER"))
            bookings = bookingRepository.findByOwner(currentUser.getId());
        else
            bookings = bookingRepository.findAll();

        int maxSize = 0;
        boolean isNext = false;
        List<BookingForm> bookingForms = new ArrayList<>();
        for (Booking book : bookings) {
            bookingForms.add(new BookingForm(book, userService.getUsername(book.getOwner())));
        }
        if (filter != null && filter.matches("active|inactive"))
            bookingForms.removeIf(booking -> booking.getActive() != filter.equals("active"));
        if (itemType != null)
            bookingForms.removeIf(booking -> !itemType.equals(booking.getItemType()));
        if (dateFromString != null) {
            LocalDate dateFrom = LocalDate.parse(dateFromString);
            bookingForms.removeIf(booking -> dateFrom.compareTo(booking.getStartDateTime()) > 0);
        }
        if (dateToString != null) {
            LocalDate dateTo = LocalDate.parse(dateToString);
            bookingForms.removeIf(booking -> dateTo.compareTo(booking.getStartDateTime()) < 0);
        }
        if (username != null )
            bookingForms.removeIf(booking -> !username.equals(booking.getUsername()));
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

    public BookingForm get(int id, User currentUser) {
        Booking booking = bookingRepository.findById(id);
        if (booking == null)
            throw new BookingNotExistException("Id " + id);
        if(currentUser.getRole().equals("USER") && currentUser.getId() != booking.getOwner())
            throw new AccessDeniedException("This user does not have access to this booking: " + id);
        return new BookingForm(booking,userService.getUsername(booking.getOwner()));
    }

    public String delete(int id, User currentUser) {
        Booking booking = bookingRepository.findById(id);
        if (booking == null)
            throw new BookingNotExistException("Id: " + id);
        if (currentUser.getRole().equals("USER") && currentUser.getId() != booking.getOwner())
            throw new AccessDeniedException("This user does not have access to this booking: " + id);
        bookingRepository.delete(booking);
        return "Booking Deleted";
    }

    public BookingForm update(int id, Booking userToUpdate, User currentUser) {
        Booking user = bookingRepository.findById(id);
        if (user == null)
            throw new BookingNotExistException("Id: " + id);
        if (currentUser.getRole().equals("USER") && currentUser.getId() != user.getOwner())
            throw new AccessDeniedException("This user does not have access to this booking: " + id);
        user.setAll(userToUpdate);
        user = bookingRepository.save(user);
        return new BookingForm(user,userService.getUsername(user.getOwner()));
    }
}