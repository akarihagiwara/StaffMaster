package jp.co.staffmaster.backend.dto;
import jp.co.staffmaster.backend.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public class StaffResponse {

    private String staffId;
    private String staffName;
    private String departmentId;
    private String positionId;
    private String email;
    private String loginId;

    public String getStaffId() {
        return staffId;
    }

    public void setStaffId(String staffId) {
        this.staffId = staffId;
    }

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

    public interface StaffRepository extends JpaRepository<Staff, String> {

        boolean existsByLoginId(String loginId);
    }
}