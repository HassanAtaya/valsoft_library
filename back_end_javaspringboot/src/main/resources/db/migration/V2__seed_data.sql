-- =============================================
-- Seed Permissions (12 total)
-- =============================================
INSERT INTO permissions (name) VALUES ('add_book');
INSERT INTO permissions (name) VALUES ('edit_book');
INSERT INTO permissions (name) VALUES ('delete_book');
INSERT INTO permissions (name) VALUES ('add_user');
INSERT INTO permissions (name) VALUES ('edit_user');
INSERT INTO permissions (name) VALUES ('delete_user');
INSERT INTO permissions (name) VALUES ('add_role');
INSERT INTO permissions (name) VALUES ('edit_role');
INSERT INTO permissions (name) VALUES ('delete_role');
INSERT INTO permissions (name) VALUES ('borrow_book');
INSERT INTO permissions (name) VALUES ('edit_key');
INSERT INTO permissions (name) VALUES ('checking');

-- =============================================
-- Seed ADMIN Role
-- =============================================
INSERT INTO roles (name) VALUES ('ADMIN');

-- =============================================
-- Give ADMIN role ALL permissions
-- =============================================
INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 1);
INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 2);
INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 3);
INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 4);
INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 5);
INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 6);
INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 7);
INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 8);
INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 9);
INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 10);
INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 11);
INSERT INTO roles_permissions (role_id, permission_id) VALUES (1, 12);

-- =============================================
-- Seed AI Keys
-- =============================================
INSERT INTO ai_keys (name, `key`, prompt) VALUES (
    'openai',
    'No_key',
    'Act as an expert AI librarian and recommendation strategist: using the user''s stated preferences, goals, skill level, and context, rank the books from most to least suitable, briefly justify each ranking internally, and return the final answer in this exact sentence format only: "The best 5 books for you by order of your preferences will be: 1) Title | Type | Author  2) Title | Type | Author..."'
);

-- =============================================
-- Seed 10 Books
-- =============================================
INSERT INTO books (name, title, type, author, image, description, in_stock, borrowed) VALUES
('Clean Code', 'Clean Code: A Handbook of Agile Software Craftsmanship', 'Programming', 'Robert C. Martin',
 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAABJRU5ErkJggg==',
 'A comprehensive guide to writing clean, maintainable code with practical examples and best practices for software craftsmen.', 5, 2);

INSERT INTO books (name, title, type, author, image, description, in_stock, borrowed) VALUES
('Design Patterns', 'Design Patterns: Elements of Reusable Object-Oriented Software', 'Programming', 'Erich Gamma et al.',
 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAABJRU5ErkJggg==',
 'Describes 23 classic design patterns with solutions to common object-oriented design problems in software engineering.', 3, 1);

INSERT INTO books (name, title, type, author, image, description, in_stock, borrowed) VALUES
('Pragmatic Programmer', 'The Pragmatic Programmer: Your Journey to Mastery', 'Software', 'David Thomas & Andrew Hunt',
 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAABJRU5ErkJggg==',
 'A collection of practical tips and strategies for modern software development, from career advice to architecture patterns.', 4, 3);

INSERT INTO books (name, title, type, author, image, description, in_stock, borrowed) VALUES
('Intro Algorithms', 'Introduction to Algorithms', 'Computer Science', 'Thomas H. Cormen',
 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAABJRU5ErkJggg==',
 'The definitive textbook covering a broad range of algorithms, their analysis, design techniques, and mathematical foundations.', 6, 2);

INSERT INTO books (name, title, type, author, image, description, in_stock, borrowed) VALUES
('AI Modern Approach', 'Artificial Intelligence: A Modern Approach', 'AI', 'Stuart Russell & Peter Norvig',
 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAABJRU5ErkJggg==',
 'The leading textbook on artificial intelligence covering search, knowledge representation, planning, learning, and more.', 3, 1);

INSERT INTO books (name, title, type, author, image, description, in_stock, borrowed) VALUES
('Art of War', 'The Art of War', 'Strategy', 'Sun Tzu',
 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAABJRU5ErkJggg==',
 'An ancient Chinese military treatise offering timeless strategic wisdom applicable to business, management, and life.', 7, 4);

INSERT INTO books (name, title, type, author, image, description, in_stock, borrowed) VALUES
('Mockingbird', 'To Kill a Mockingbird', 'Fiction', 'Harper Lee',
 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAABJRU5ErkJggg==',
 'A powerful novel exploring racial injustice and moral growth through the eyes of a young girl in the American South.', 5, 2);

INSERT INTO books (name, title, type, author, image, description, in_stock, borrowed) VALUES
('1984', '1984', 'Fiction', 'George Orwell',
 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAABJRU5ErkJggg==',
 'A dystopian novel depicting a totalitarian society where Big Brother watches everything, exploring themes of freedom and truth.', 4, 0);

INSERT INTO books (name, title, type, author, image, description, in_stock, borrowed) VALUES
('Great Gatsby', 'The Great Gatsby', 'Classic', 'F. Scott Fitzgerald',
 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAABJRU5ErkJggg==',
 'A tragic tale of wealth, love, and the American Dream set in the Jazz Age, exploring themes of decadence and idealism.', 3, 1);

INSERT INTO books (name, title, type, author, image, description, in_stock, borrowed) VALUES
('Sapiens', 'Sapiens: A Brief History of Humankind', 'History', 'Yuval Noah Harari',
 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAABJRU5ErkJggg==',
 'A sweeping narrative exploring the history of humankind from the Stone Age to the twenty-first century and beyond.', 5, 3);
