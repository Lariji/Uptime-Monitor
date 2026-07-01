CREATE TABLE websites (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE ping_Results (
    id SERIAL PRIMARY KEY,
    website_Id INT references websites(id),
    is_Up BOOLEAN not null,
    pinged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO websites (url) VALUES 
    ('https://www.google.com/'),
    ('https://www.mdlmdlmdl.co/'),
    ('https://httpbin.org/status/500');