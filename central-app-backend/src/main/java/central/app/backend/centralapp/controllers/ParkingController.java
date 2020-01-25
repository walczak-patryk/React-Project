package central.app.backend.centralapp.controllers;

import central.app.backend.centralapp.services.ParkingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/parkings")
public class ParkingController {
    private ParkingService parkingService;

    @Autowired
    public ParkingController(ParkingService parkingService) {
        this.parkingService = parkingService;
    }

    @GetMapping("")
    public ResponseEntity<String> getAllCars() {
        return ResponseEntity.ok().body(parkingService.getParking());
    }
}
