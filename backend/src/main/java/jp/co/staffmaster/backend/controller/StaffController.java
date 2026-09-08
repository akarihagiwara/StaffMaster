package jp.co.staffmaster.backend.controller;

import java.util.List;

import jp.co.staffmaster.backend.dto.StaffRequest;
import jp.co.staffmaster.backend.dto.StaffResponse;
import jp.co.staffmaster.backend.service.StaffService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import jp.co.staffmaster.backend.dto.StaffUpdateRequest;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    private final StaffService staffService;

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @GetMapping
    public List<StaffResponse> findAll() {
        return staffService.findAll();
    }

    @GetMapping("/{staffId}")
    public StaffResponse findById(@PathVariable String staffId) {
        return staffService.findById(staffId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StaffResponse create(
            @Valid @RequestBody StaffRequest request) {
        return staffService.create(request);
    }

    @PutMapping("/{staffId}")
    public StaffResponse update(
            @PathVariable String staffId,
            @Valid @RequestBody StaffUpdateRequest request) {
        return staffService.update(staffId, request);
    }

    @DeleteMapping("/{staffId}")
    public ResponseEntity<Void> deleteById(@PathVariable String staffId) {
        staffService.deleteById(staffId);
        return ResponseEntity.noContent().build();
    }
}