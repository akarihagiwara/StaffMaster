package jp.co.staffmaster.backend.controller;

import jakarta.validation.Valid;
import jp.co.staffmaster.backend.dto.LoginRequest;
import jp.co.staffmaster.backend.dto.StaffResponse;
import jp.co.staffmaster.backend.service.StaffService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final StaffService staffService;

    public AuthController(StaffService staffService) {
        this.staffService = staffService;
    }

    @PostMapping("/login")
    public StaffResponse login(
            @Valid @RequestBody LoginRequest request
    ) {
        return staffService.login(request);
    }
}