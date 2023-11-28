package ds.pamiw.backend.controllers;


import ds.pamiw.backend.services.AuthenticationService;
import ds.pamiw.backend.shared.AuthenticationRequest;
import ds.pamiw.backend.shared.AuthenticationResponse;
import ds.pamiw.backend.shared.ServiceResponse;
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
  public ServiceResponse<AuthenticationResponse> register(@RequestBody AuthenticationRequest request){
    return new ServiceResponse(this.authenticationService.register(request),true,"");

  }
  @PostMapping("/authenticate")
  public ServiceResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
    return new ServiceResponse(this.authenticationService.authenticate(request),true,"");
  }
}
