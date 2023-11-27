package ds.pamiw.backend.services;

import ds.pamiw.backend.models.User;
import ds.pamiw.backend.repositories.UserRepository;
import ds.pamiw.backend.shared.AuthenticationRequest;
import ds.pamiw.backend.shared.AuthenticationResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

  private final UserRepository userRepository;
  private  final PasswordEncoder passwordEncoder;
  private final  JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
    this.authenticationManager = authenticationManager;
  }

  public AuthenticationResponse register(AuthenticationRequest request) {
    User user = new User(request.getUsername(), passwordEncoder.encode(request.getPassword()));
    userRepository.save(user);
    String jwtToken = jwtService.generateToken(user);
    return new AuthenticationResponse(jwtToken);
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword())
    );
    User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
    String jwtToken = jwtService.generateToken(user);
    return new AuthenticationResponse(jwtToken);
  }
}
