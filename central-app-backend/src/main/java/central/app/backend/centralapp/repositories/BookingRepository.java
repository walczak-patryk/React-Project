package central.app.backend.centralapp.repositories;

import central.app.backend.centralapp.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findByowner(int owner);
    Booking findByid(int id);
}
