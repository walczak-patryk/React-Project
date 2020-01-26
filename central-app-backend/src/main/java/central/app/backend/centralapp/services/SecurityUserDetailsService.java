package central.app.backend.centralapp.services;

import central.app.backend.centralapp.models.User;
import central.app.backend.centralapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class SecurityUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User centralUser = userRepository.findByLogin(username);
        if(centralUser == null){
            throw new UsernameNotFoundException("User with login " + username + " not found.");
        }
        return new org.springframework.security.core.userdetails.User(
                centralUser.getLogin(), centralUser.getPassword(), getAuthority(centralUser));
    }

    private Set<SimpleGrantedAuthority> getAuthority(User centralUser){
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + centralUser.getRole()));
        return authorities;
    }
}
