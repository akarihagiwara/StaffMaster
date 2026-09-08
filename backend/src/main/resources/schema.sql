CREATE TABLE
    IF NOT EXISTS departments (
        department_id VARCHAR(10) PRIMARY KEY,
        department_name VARCHAR(100) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS positions (
        position_id VARCHAR(10) PRIMARY KEY,
        position_name VARCHAR(100) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS staffs (
        staff_id VARCHAR(8) PRIMARY KEY,
        staff_name VARCHAR(100) NOT NULL,
        department_id VARCHAR(10),
        position_id VARCHAR(10),
        email VARCHAR(254),
        login_id VARCHAR(8) NOT NULL,
        login_password VARCHAR(8) NOT NULL,
        CONSTRAINT uk_staffs_login_id UNIQUE (login_id),
        CONSTRAINT ck_staffs_login_id_format CHECK (REGEXP_LIKE (login_id, '^[A-Za-z0-9]{1,8}$')),
        CONSTRAINT ck_staffs_login_password_format CHECK (REGEXP_LIKE (login_password, '^[A-Za-z0-9]{1,8}$')),
        CONSTRAINT fk_staffs_department FOREIGN KEY (department_id) REFERENCES departments (department_id),
        CONSTRAINT fk_staffs_position FOREIGN KEY (position_id) REFERENCES positions (position_id)
    );
