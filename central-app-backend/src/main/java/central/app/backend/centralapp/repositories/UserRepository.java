package central.app.backend.centralapp.repositories;

import central.app.backend.centralapp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	User findByLogin(String login);
	User findById(int Id);
}