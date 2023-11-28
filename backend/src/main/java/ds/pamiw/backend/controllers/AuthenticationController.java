package ds.pamiw.backend.controllers;


import ds.pamiw.backend.services.AuthenticationService;
import ds.pamiw.backend.shared.AuthenticationRequest;
import ds.pamiw.backend.shared.AuthenticationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {

  private final AuthenticationService authenticationService;

  public AuthenticationController(AuthenticationService authenticationService) {
    this.authenticationService = authenticationService;
  }

  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request){
    return ResponseEntity.ok(this.authenticationService.register(request));

  }
  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
    return ResponseEntity.ok(this.authenticationService.authenticate(request));
  }
}
