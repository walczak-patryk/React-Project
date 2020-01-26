package central.app.backend.centralapp.forms;

import java.time.LocalDateTime;

public class LoginForm {
    private String username;
    private String password;

    public String getUsername() { return this.username; }
    public String getPassword() { return this.password; }

    public LoginForm(String username, String password){
        this.username = username;
        this.password = password;
    }
}
