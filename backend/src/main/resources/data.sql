MERGE INTO departments KEY(department_id) VALUES
    ('D001', '総務部'),
    ('D002', '営業部'),
    ('D003', '開発部');

MERGE INTO positions KEY(position_id) VALUES
    ('P001', '部長'),
    ('P002', '課長'),
    ('P003', '一般');

MERGE INTO staffs KEY(staff_id) VALUES
    ('S001', '管理 太郎', 'D001', 'P001',
     'admin@example.com', 'admin01', 'pass123'),

    ('S002', '営業 花子', 'D002', 'P002',
     'hanako@example.com', 'sales01', 'sales123'),

    ('S003', '開発 次郎', 'D003', 'P003',
     'jiro@example.com', 'dev0001', 'dev1234');