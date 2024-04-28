insert into "User"("userId", password, name, phone, location, role)
values ('admin',
        '$2a$10$WWdBeFs7WcOFG0G88WVnbOP8NR2fw.FkkSXNpQkxCqSmP3e8eajk6',
        'admintest', '1234567890',
        'bengaluru', 'ROLE_ADMIN')
on conflict do nothing;
insert into "User"("userId", password, name, phone, location, role, server)
values ('hospital@hospital.com', '$2a$10$WWdBeFs7WcOFG0G88WVnbOP8NR2fw.FkkSXNpQkxCqSmP3e8eajk6', 'hospitaltest',
        '1234567890', 'bengaluru', 'ROLE_HOSPITAL', 'http://localhost:8080/api/v1')
on conflict do nothing;
insert into "User"("userId", password, name, phone, location, dob, role)
values ('123456789012',
        '$2a$10$WWdBeFs7WcOFG0G88WVnbOP8NR2fw.FkkSXNpQkxCqSmP3e8eajk6',
        'patienttest', '1234567890',
        'bengaluru', '$2a$10$swBnpHXUbkwdnA3z4Q1fxuCbhum.G7BasBfuujVk83RswS9yCiwf.', 'ROLE_PATIENT')
on conflict do nothing;
insert into "User"("userId", password, name, phone, location, role)
values ('researcher@researcher.com',
        '$2a$10$WWdBeFs7WcOFG0G88WVnbOP8NR2fw.FkkSXNpQkxCqSmP3e8eajk6',
        'researchertest', '1234567890',
        'bengaluru', 'ROLE_RESEARCHER')
on conflict do nothing;
insert into "User"("userId", password, name, role)
values ('model1',
        '$2a$10$WWdBeFs7WcOFG0G88WVnbOP8NR2fw.FkkSXNpQkxCqSmP3e8eajk6',
        'model1',
        'ROLE_MODEL')
on conflict do nothing;