CREATE TABLE eligibility (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phuId VARCHAR(16),

    -- JSON data, formatted by the application
    data TEXT,

    lastUpdated TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy VARCHAR(255)
)
