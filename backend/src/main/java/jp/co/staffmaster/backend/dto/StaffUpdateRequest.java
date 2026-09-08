package jp.co.staffmaster.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class StaffUpdateRequest {

    @NotBlank(message = "スタッフ名を入力してください。")
    private String staffName;

    private String departmentId;
    private String positionId;
    private String email;

    @NotBlank(message = "ログインIDを入力してください。")
    private String loginId;

    @NotBlank(message = "ログインパスワードを入力してください。")
    private String loginPassword;

    public String getStaffName() {
        return staffName;
    }

    public void setStaffName(String staffName) {
        this.staffName = staffName;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public String getPositionId() {
        return positionId;
    }

    public void setPositionId(String positionId) {
        this.positionId = positionId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLoginId() {
        return loginId;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    public String getLoginPassword() {
        return loginPassword;
    }

    public void setLoginPassword(String loginPassword) {
        this.loginPassword = loginPassword;
    }
}