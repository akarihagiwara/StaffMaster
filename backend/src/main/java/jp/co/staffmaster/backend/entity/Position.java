package jp.co.staffmaster.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "positions")
public class Position {

    @Id
    @Column(name = "position_id")
    private String positionId;

    @Column(name = "position_name")
    private String positionName;

    public String getPositionId() {
        return positionId;
    }

    public String getPositionName() {
        return positionName;
    }
}