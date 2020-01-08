package central.app.backend.centralapp.controllers;

import central.app.backend.centralapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> createUser(@RequestBody(required = true) String request) {
        return ResponseEntity.ok().body(userService.login(request));
    }

//    @GetMapping("")
//    public ResponseEntity<List<User>> getUsers(@RequestParam(required = false) String login) {
//        if (login == null)
//            return ResponseEntity.ok().body(userService.findAll());
//        return ResponseEntity.ok().body(userService.findByLogin(login));
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<User> getUser(@PathVariable(value = "id") int id) {
//        return ResponseEntity.ok().body(userService.findById(id));
//    }
//
//    @PostMapping("")
//    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
//        return ResponseEntity.ok().body(userService.create(user));
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<User> updateUser(@PathVariable(value = "id") int id, @Valid @RequestBody User user) {
//        return ResponseEntity.ok().body(userService.update(id, user));
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<User> deleteUser(@PathVariable(value = "id") int id) {
//        return ResponseEntity.ok().body(userService.delete(id));
//    }
//
//    @ExceptionHandler({UserAlreadyExistsException.class})
//    public ResponseEntity<ErrorResponse> alreadyExists(UserAlreadyExistsException ex) {
//        return new ResponseEntity<>(
//                new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST.value(), "The user already exists"),
//                HttpStatus.BAD_REQUEST);
//    }
//
//    @ExceptionHandler({UserNotFoundException.class})
//    public ResponseEntity<ErrorResponse> notFound(UserNotFoundException ex) {
//        return new ResponseEntity<>(
//                new ErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND.value(), "The user was not found"),
//                HttpStatus.NOT_FOUND);
//    }
}