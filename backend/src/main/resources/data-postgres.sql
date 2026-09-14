INSERT INTO
    departments (department_id, department_name)
VALUES
    ('D001', '総務部'),
    ('D002', '営業部'),
    ('D003', '開発部') ON CONFLICT (department_id) DO
UPDATE
SET
    department_name = EXCLUDED.department_name;

INSERT INTO
    positions (position_id, position_name)
VALUES
    ('P001', '部長'),
    ('P002', '課長'),
    ('P003', '一般') ON CONFLICT (position_id) DO
UPDATE
SET
    position_name = EXCLUDED.position_name;

INSERT INTO staffs (
    staff_id,
    staff_name,
    department_id,
    position_id,
    email,
    login_id,
    login_password
) VALUES
    (
        'S001',
        '管理 太郎',
        'D001',
        'P001',
        'admin@example.com',
        'admin01',
        'pass123'
    ),
    (
        'S002',
        '営業 花子',
        'D002',
        'P002',
        'hanako@example.com',
        'sales01',
        'sales123'
    ),
    (
        'S003',
        '開発 次郎',
        'D003',
        'P003',
        'jiro@example.com',
        'dev0001',
        'dev1234'
    )
ON CONFLICT (staff_id) DO NOTHING;