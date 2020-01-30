package central.app.backend.centralapp.security;

import central.app.backend.centralapp.services.SecurityUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class jwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private SecurityUserDetailsService securityUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String requestAuthorizationHeader = request.getHeader("Authorization");

        // Retrieving token
        String username = null;
        String token = null;
        if(requestAuthorizationHeader != null && requestAuthorizationHeader.startsWith("Bearer ")){
            token = requestAuthorizationHeader.substring(7);
            try{
                username = jwtUtil.extractUsername(token);
            }
            catch(IllegalArgumentException e){
                System.out.println("JWT token compact of handler are invalid.");
            }
            catch(ExpiredJwtException e){
                System.out.println("JWT token has expired.");
            }
            catch(SignatureException e){
                System.out.println("Invalid JWT signature.");
            }
            catch(MalformedJwtException e){
                System.out.println("Invalid JWT token.");
            }
            catch(UnsupportedJwtException e){
                System.out.println("Unsupported JWT exception.");
            }
        }
        else if(requestAuthorizationHeader != null){
            System.out.println("JWT token without 'Bearer '.");
        }

        // Validating token
        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = null;
            try {
                userDetails = this.securityUserDetailsService.loadUserByUsername(username);
            }
            catch(UsernameNotFoundException e){
                System.out.println("Unsupported JWT exception.");
            }
            if (userDetails != null && jwtUtil.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }

        }
        filterChain.doFilter(request,response);
    }
}
