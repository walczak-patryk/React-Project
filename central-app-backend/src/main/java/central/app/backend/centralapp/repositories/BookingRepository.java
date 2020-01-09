package central.app.backend.centralapp.repositories;

import central.app.backend.centralapp.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findByOwner(int owner);
    Booking findById(int id);
    List<Booking> findByActive(boolean active);
}
