package central.app.backend.centralapp.controllers;

import central.app.backend.centralapp.errors.ErrorResponse;
import central.app.backend.centralapp.errors.IncorrectPasswordException;
import central.app.backend.centralapp.errors.UserNotFoundException;
import central.app.backend.centralapp.forms.LoginForm;
import central.app.backend.centralapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@Valid @RequestBody LoginForm loginForm) {
        return ResponseEntity.ok().body(userService.login(loginForm));
    }

    @ExceptionHandler({UserNotFoundException.class})
    public ResponseEntity<ErrorResponse> notFound(UserNotFoundException ex) {
        return new ResponseEntity<>(
                new ErrorResponse("The user was not found", HttpStatus.NOT_FOUND.value(), ex.getMessage()),
                HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({IncorrectPasswordException.class})
    public ResponseEntity<ErrorResponse> notFound(IncorrectPasswordException ex) {
        return new ResponseEntity<>(
                new ErrorResponse("Your password is invalid", HttpStatus.UNAUTHORIZED.value(), ex.getMessage()),
                HttpStatus.NOT_FOUND);
    }
}