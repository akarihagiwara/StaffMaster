package jp.co.staffmaster.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jp.co.staffmaster.backend.dto.LoginRequest;
import jp.co.staffmaster.backend.dto.StaffResponse;
import jp.co.staffmaster.backend.service.StaffService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final StaffService staffService;
    private final SecurityContextRepository securityContextRepository;

    public AuthController(
            StaffService staffService,
            SecurityContextRepository securityContextRepository) {
        this.staffService = staffService;
        this.securityContextRepository = securityContextRepository;
    }

    @PostMapping("/login")
    public StaffResponse login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {
        StaffResponse staff = staffService.login(loginRequest);

        var authentication = UsernamePasswordAuthenticationToken.authenticated(
                staff.getLoginId(),
                null,
                AuthorityUtils.createAuthorityList("ROLE_USER"));

        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(authentication);
        SecurityContextHolder.setContext(securityContext);

        securityContextRepository.saveContext(
                securityContext,
                httpRequest,
                httpResponse);

        return staff;
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(HttpServletRequest httpRequest) {
        var session = httpRequest.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        SecurityContextHolder.clearContext();
    }
}