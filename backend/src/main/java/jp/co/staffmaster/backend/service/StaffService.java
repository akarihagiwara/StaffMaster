package jp.co.staffmaster.backend.service;

import java.util.List;

import jp.co.staffmaster.backend.dto.StaffRequest;
import jp.co.staffmaster.backend.dto.StaffResponse;
import jp.co.staffmaster.backend.entity.Staff;
import jp.co.staffmaster.backend.repository.StaffRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jp.co.staffmaster.backend.dto.StaffUpdateRequest;
import jp.co.staffmaster.backend.dto.LoginRequest;

@Service
public class StaffService {

    private final StaffRepository staffRepository;

    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    public List<StaffResponse> findAll() {
        return staffRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public StaffResponse findById(String staffId) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "スタッフが見つかりません。"));

        return toResponse(staff);
    }

    private StaffResponse toResponse(Staff staff) {
        StaffResponse response = new StaffResponse();
        response.setStaffId(staff.getStaffId());
        response.setStaffName(staff.getStaffName());
        response.setDepartmentId(staff.getDepartmentId());
        response.setPositionId(staff.getPositionId());
        response.setEmail(staff.getEmail());
        response.setLoginId(staff.getLoginId());
        return response;
    }

    public StaffResponse create(StaffRequest request) {
        if (staffRepository.existsById(request.getStaffId())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "このスタッフIDはすでに登録されています。");
        }

        if (staffRepository.existsByLoginId(request.getLoginId())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "このログインIDはすでに登録されています。");
        }

        Staff staff = new Staff();
        staff.setStaffId(request.getStaffId());
        staff.setStaffName(request.getStaffName());
        staff.setDepartmentId(request.getDepartmentId());
        staff.setPositionId(request.getPositionId());
        staff.setEmail(request.getEmail());
        staff.setLoginId(request.getLoginId());
        staff.setLoginPassword(request.getLoginPassword());

        Staff savedStaff = staffRepository.save(staff);

        return toResponse(savedStaff);
    }

    public StaffResponse update(String staffId, StaffUpdateRequest request) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "スタッフが見つかりません。"));

        boolean loginIdChanged = !staff.getLoginId().equals(request.getLoginId());

        if (loginIdChanged && staffRepository.existsByLoginId(request.getLoginId())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "このログインIDはすでに登録されています。");
        }

        staff.setStaffName(request.getStaffName());
        staff.setDepartmentId(request.getDepartmentId());
        staff.setPositionId(request.getPositionId());
        staff.setEmail(request.getEmail());
        staff.setLoginId(request.getLoginId());
        staff.setLoginPassword(request.getLoginPassword());

        Staff updatedStaff = staffRepository.save(staff);

        return toResponse(updatedStaff);
    }

    public void deleteById(String staffId) {
        if (!staffRepository.existsById(staffId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "スタッフが見つかりません。");
        }

        staffRepository.deleteById(staffId);
    }

    public StaffResponse login(LoginRequest request) {
        Staff staff = staffRepository
                .findByLoginIdAndLoginPassword(
                        request.getLoginId(),
                        request.getLoginPassword())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "ログインIDまたはログインパスワードが異なります。"));

        return toResponse(staff);
    }
}