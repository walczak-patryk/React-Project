package central.app.backend.centralapp.security;

import central.app.backend.centralapp.services.SecurityUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtRequestFilter extends OncePerRequestFilter {

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
                System.out.println("Unable to get JWT token");
            }
            catch(ExpiredJwtException e){
                System.out.println("JWT token has expired");
            }
        }
        else{
            logger.warn("JWT token does not begin with Bearer ");
        }

        // Validating token
        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.securityUserDetailsService.loadUserByUsername(username);

            if(jwtUtil.validateToken(token,userDetails)){
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
