package jp.co.staffmaster.backend.repository;

import jp.co.staffmaster.backend.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, String> {

    boolean existsByLoginId(String loginId);

    Optional<Staff> findByLoginIdAndLoginPassword(
            String loginId,
            String loginPassword);
}