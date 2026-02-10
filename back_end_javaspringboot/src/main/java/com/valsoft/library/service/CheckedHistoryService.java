package com.valsoft.library.service;

import com.valsoft.library.dto.CheckInDto;
import com.valsoft.library.entity.Book;
import com.valsoft.library.entity.CheckedHistory;
import com.valsoft.library.repository.BookRepository;
import com.valsoft.library.repository.CheckedHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CheckedHistoryService {

    @Autowired
    private CheckedHistoryRepository historyRepository;

    @Autowired
    private BookRepository bookRepository;

    public List<CheckedHistory> getAllHistory() {
        return historyRepository.findAll();
    }

    @Transactional
    public CheckedHistory checkIn(CheckInDto dto) {
        Book book = bookRepository.findById(dto.bookId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));

        if (book.getInStock() == null || book.getInStock() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Book is not in stock");
        }

        // Create history entry
        CheckedHistory history = new CheckedHistory();
        history.setAction("IN");
        history.setDate(LocalDateTime.now());
        history.setFirstName(dto.firstName);
        history.setLastName(dto.lastName);
        history.setPhoneNumber(dto.phoneNumber);
        history.setBook(book);
        history.setOut(true);

        // Update book stock
        book.setInStock(book.getInStock() - 1);
        book.setBorrowed(book.getBorrowed() + 1);
        bookRepository.save(book);

        return historyRepository.save(history);
    }

    @Transactional
    public CheckedHistory checkOut(Long historyId) {
        CheckedHistory original = historyRepository.findById(historyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "History entry not found"));

        if (!"IN".equals(original.getAction()) || !Boolean.TRUE.equals(original.getOut())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This entry cannot be checked out");
        }

        // Create new OUT entry
        CheckedHistory outEntry = new CheckedHistory();
        outEntry.setAction("OUT");
        outEntry.setDate(LocalDateTime.now());
        outEntry.setFirstName(original.getFirstName());
        outEntry.setLastName(original.getLastName());
        outEntry.setPhoneNumber(original.getPhoneNumber());
        outEntry.setBook(original.getBook());
        outEntry.setOut(true);

        // Mark original as returned (out = false)
        original.setOut(false);
        historyRepository.save(original);

        // Update book stock
        Book book = original.getBook();
        if (book != null) {
            book.setInStock(book.getInStock() + 1);
            book.setBorrowed(Math.max(0, book.getBorrowed() - 1));
            bookRepository.save(book);
        }

        return historyRepository.save(outEntry);
    }
}
