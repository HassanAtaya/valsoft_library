-- Permissions table
CREATE TABLE IF NOT EXISTS permissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Roles table
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    preferences TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Roles-Users join table
CREATE TABLE IF NOT EXISTS roles_users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    role_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Roles-Permissions join table
CREATE TABLE IF NOT EXISTS roles_permissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    role_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Books table
CREATE TABLE IF NOT EXISTS books (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    author VARCHAR(255),
    image TEXT,
    description TEXT,
    in_stock INT DEFAULT 0,
    borrowed INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- AI Keys table
CREATE TABLE IF NOT EXISTS ai_keys (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    `key` VARCHAR(255),
    prompt TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Checked History table
CREATE TABLE IF NOT EXISTS checked_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(10),
    date DATETIME,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone_number VARCHAR(20),
    book_id BIGINT,
    `out` TINYINT(1) DEFAULT 0,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
