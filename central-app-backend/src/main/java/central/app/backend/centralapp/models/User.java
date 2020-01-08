package central.app.backend.centralapp.models;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User implements Serializable {

	// columns
    private static final long serialVersionUID = -2343243243242432341L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "login", nullable = false)
    private String login;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "security_tocken",nullable = false)
    private String securityToken;

	//constructors
    public User() {
    }

    public User(String login, String password, String firstName, String lastName, String securityToken) {
        this.login = login;
        this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.securityToken = securityToken;
    }

    // setters and getters
    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

	public String getLogin() {
		return this.login;
	}

	public void setLogin(String login) { this.login = login; }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) { this.password = password; }

    public String getFirstName() { return this.firstName; }

    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return this.lastName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

	public String getSecurityToken() { return this.securityToken; }

	public void setSecurityToken(String securityToken) { this.securityToken = securityToken; }

    public void setAll(String login, String password, String firstName, String lastName, String securityToken) {
		this.login = login;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.securityToken = securityToken;
    }

    @Override
    public String toString() {
        return "{" +",\n"+
                "\"login\":" + this.login + ",\n"+
				"\"password\":" + this.password + ",\n"+
                "\"firstName\":" + this.firstName + ",\n"+
                "\"lastName\":" + this.lastName + ",\n"+
                "\"securityTocken\":" + this.securityToken +",\n"+
                "}";
    }
}