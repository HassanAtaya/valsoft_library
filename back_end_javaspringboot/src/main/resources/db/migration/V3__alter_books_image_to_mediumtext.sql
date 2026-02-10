-- Increase capacity of books.image column to store larger base64 images
ALTER TABLE books
    MODIFY image MEDIUMTEXT;