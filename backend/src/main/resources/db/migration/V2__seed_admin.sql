-- Seed a default administrator with role ADMIN
-- Password is 'admin123'
INSERT INTO administrators (name, email, password_hash, role, is_active)
VALUES ('Super Admin', 'admin@sms.com', '$2a$10$vkity7uWsOjQPLCxgHPoEODy3dMhYdiU5gQZWm2vyGs05dkroOjAa', 'ADMIN', true);
