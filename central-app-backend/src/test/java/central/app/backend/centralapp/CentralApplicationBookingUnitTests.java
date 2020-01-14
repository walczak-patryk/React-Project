package central.app.backend.centralapp;

import central.app.backend.centralapp.controllers.BookingController;
import central.app.backend.centralapp.exceptions.BookingNotExistException;
import central.app.backend.centralapp.models.Booking;
import central.app.backend.centralapp.repositories.BookingRepository;
import central.app.backend.centralapp.services.BookingService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.BDDAssertions.then;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.internal.verification.VerificationModeFactory.times;

@SpringBootTest
@ActiveProfiles("dev")
@RunWith(MockitoJUnitRunner.class)
public class CentralApplicationBookingUnitTests {

    private static List<Booking> bookings = Arrays.asList(
            new Booking(1, 1, LocalDate.of(2020, 1, 7), true, 3, "car"),
            new Booking(2, 2, LocalDate.of(2013, 2, 3), false, 5, "flat"),
            new Booking(3, 4, LocalDate.of(1999, 6, 28), true, 7, "car"),
            new Booking(4, 2, LocalDate.of(2017, 8, 14), true, 1, "parking"),
            new Booking(5, 3, LocalDate.of(2019, 11, 19), false, 3, "flat"),
            new Booking(3, LocalDate.of(2009, 12, 9), true, 22, "parking")

    );

    private BookingController bookingController;

    @InjectMocks
    private BookingService bookingService;

    @Mock
    private BookingRepository bookingRepository;

    @Before
    public void setUp() {
        bookingController = new BookingController(bookingService);
    }

    @Test
    public void whenCreateBooking_thenReturnSavedBooking() {
        //given
        given(bookingRepository.save(bookings.get(1))).willReturn(bookings.get(1));

        // when
        ResponseEntity<Booking> response = bookingController.createBooking(bookings.get(1));

        //then
        then(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(response.getBody()).isEqualTo(bookings.get(1));
    }

    @Test
    public void givenBookingFromRepository_whenGetBookingParamIsNull_thenReturnAllBooking() {
        //given
        given(bookingRepository.findAll()).willReturn(bookings);

        // when
        ResponseEntity<List<Booking>> response = bookingController.getAllBookings(null);

        //then
        then(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(response.getBody()).hasSize(bookings.size());
        then(response.getBody()).isEqualTo(bookings);
    }

    @Test
    public void givenBookingFromRepository_whenGetBookingParamIsActive_thenReturnActiveBooking() {
        List<Booking> activeBookings = bookings.stream().filter(b -> b.getActive()).collect(Collectors.toList());
        //given
        given(bookingRepository.findAll()).willReturn(new ArrayList<>(bookings));

        // when
        ResponseEntity<List<Booking>> response = bookingController.getAllBookings("active");

        //then
        then(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(response.getBody()).hasSize(activeBookings.size());
        then(response.getBody()).isEqualTo(activeBookings);
    }

    @Test
    public void givenBookingFromRepository_whenGetBookingParamIsInactive_thenReturnInactiveBooking() {
        List<Booking> activeBookings = bookings.stream().filter(b -> !b.getActive()).collect(Collectors.toList());
        //given
        given(bookingRepository.findAll()).willReturn(new ArrayList<>(bookings));

        // when
        ResponseEntity<List<Booking>> response = bookingController.getAllBookings("inactive");

        //then
        then(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(response.getBody()).hasSize(activeBookings.size());
        then(response.getBody()).isEqualTo(activeBookings);
    }

    @Test
    public void givenBookingFromRepository_whenGetBookingParamIsUnknown_thenReturnAllBooking() {
        //given
        given(bookingRepository.findAll()).willReturn(new ArrayList<>(bookings));

        // when
        ResponseEntity<List<Booking>> response = bookingController.getAllBookings("error");

        //then
        then(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(response.getBody()).hasSize(bookings.size());
        then(response.getBody()).isEqualTo(bookings);
    }

    @Test
    public void givenBookingId_whenGetBookingById_thenReturnBooking() {
        //given
        given(bookingRepository.findById(2)).willReturn(bookings.get(2));

        // when
        ResponseEntity<Booking> response = bookingController.getBooking(2);

        //then
        then(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(response.getBody()).isEqualTo(bookings.get(2));
    }

    @Test(expected = BookingNotExistException.class)
    public void givenInvalidBookingId_whenGetBookingByIdIsInvoked_thenThrowException() {
        // given
        given(bookingRepository.findById(-1)).willReturn(null);

        // when
        when(bookingController.getBooking(-1)).thenThrow(BookingNotExistException.class);
    }

    @Test
    public void givenBookingId_whenDeleteBookingIsInvoked_thenReturnValidResponse() {
        // given
        given(bookingRepository.findById(bookings.get(4).getId())).willReturn(bookings.get(4));

        // when
        ResponseEntity<String> response = bookingController.deleteBooking(bookings.get(4).getId());

        //then
        then(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(response.getBody()).isEqualTo("Booking Deleted");
    }

    @Test(expected = BookingNotExistException.class)
    public void givenInvalidBookingId_whenDeleteBookingIsInvoked_thenThrowException() {
        // given
        given(bookingRepository.findById(-1)).willReturn(null);

        // when
        when(bookingController.deleteBooking(-1)).thenThrow(BookingNotExistException.class);
    }

    @Test
    public void givenExistingId_whenUpdateBooking_theReturnUpdatedBooking() {
        //given
        given(bookingRepository.findById(1)).willReturn(bookings.get(0));
        Booking bookingToUpdate = bookings.get(0);
        bookingToUpdate.setItemType("TestItemType");

        //when
        ResponseEntity<Booking> result = bookingController.updateBooking(1, bookingToUpdate);

        //then
        assertThat(bookingRepository.findById(1)).isEqualTo(bookingToUpdate);
        verify(bookingRepository, times(2)).findById(eq(1));
        verify(bookingRepository, times(1)).save(eq(bookingToUpdate));
    }

    @Test(expected = BookingNotExistException.class)
    public void givenNonExistingId_whenUpdateUser_theReturnUserNotFoundException() {
        when(bookingController.updateBooking(1, new Booking())).thenThrow(BookingNotExistException.class);
        verify(bookingRepository, times(1)).findById(eq(1));
        verify(bookingRepository, times(0)).save(new Booking());
    }
}
