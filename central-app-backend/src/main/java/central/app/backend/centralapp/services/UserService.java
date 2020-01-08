package central.app.backend.centralapp.services;

import central.app.backend.centralapp.errors.UserAlreadyExistsException;
import central.app.backend.centralapp.errors.UserNotFoundException;
import central.app.backend.centralapp.models.User;
import central.app.backend.centralapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public List<User> findByLogin(String login) {
        List<User> users = userRepository.findByLogin(login);
        if (users == null || users.isEmpty())
            throw new UserNotFoundException("login: " + login);
        return users;
    }

    public User findById(int id) {
        User user = userRepository.findById(id);
        if (user == null)
            throw new UserNotFoundException("Id: " + id);
        return user;
    }

    public User create(User userToCreate) {
        List<User> user = userRepository.findByLogin(userToCreate.getLogin());
        if (user != null && !user.isEmpty()){
            throw new UserAlreadyExistsException("Login: " + userToCreate.getLogin());
        }
        return userRepository.save(userToCreate);
    }

    public User save(User userToSave) {
        return userRepository.save(userToSave);
    }

    public User update(int id, User userToUpdate) {
        User user = userRepository.findById(id);
        if (user == null)
            throw new UserNotFoundException("Id: " + id);
        user.setAll(userToUpdate.getLogin(), userToUpdate.getPassword(), userToUpdate.getFirstName(), userToUpdate.getLastName(), userToUpdate.getSecurityToken());
        return userRepository.save(user);
    }

    public User delete(int id) {
        User user = userRepository.findById(id);
        if (user == null)
            throw new UserNotFoundException("Id: " + id);
        userRepository.delete(user);
        return user;
    }

    public String login(String request) {
        return request;
    }
}