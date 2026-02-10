package com.valsoft.library.service;

import com.valsoft.library.entity.Book;
import com.valsoft.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));
    }

    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    public Book updateBook(Long id, Book bookData) {
        Book book = getBookById(id);
        book.setName(bookData.getName());
        book.setTitle(bookData.getTitle());
        book.setType(bookData.getType());
        book.setAuthor(bookData.getAuthor());
        book.setImage(bookData.getImage());
        book.setDescription(bookData.getDescription());
        book.setInStock(bookData.getInStock());
        // borrowed is NOT editable from the book form
        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        Book book = getBookById(id);
        if (book.getBorrowed() != null && book.getBorrowed() > 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot delete book with active borrows");
        }
        bookRepository.deleteById(id);
    }

    public List<Book> findAvailableBooks() {
        return bookRepository.findByInStockGreaterThan(0);
    }
}
