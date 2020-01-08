package central.app.backend.centralapp.services;

import central.app.backend.centralapp.errors.IncorrectPasswordException;
import central.app.backend.centralapp.errors.UserNotFoundException;
import central.app.backend.centralapp.forms.LoginForm;
import central.app.backend.centralapp.models.User;
import central.app.backend.centralapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String login(LoginForm loginForm) {
        User user = userRepository.findByLogin(loginForm.getLogin());
        if (user == null)
            throw new UserNotFoundException("Login: " + loginForm.getLogin());
        if (!user.getPassword().equals(loginForm.getPassword()))
            throw new IncorrectPasswordException(user.getPassword() + " " + loginForm.getPassword());
        return user.getSecurityToken();
    }
}