package com.valsoft.library.service;

import com.valsoft.library.dto.AiDto;
import com.valsoft.library.entity.AiKey;
import com.valsoft.library.entity.AppUser;
import com.valsoft.library.entity.Book;
import com.valsoft.library.repository.AiKeyRepository;
import com.valsoft.library.repository.AppUserRepository;
import com.valsoft.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AiService {

    @Autowired
    private AppUserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AiKeyRepository aiKeyRepository;

    public AiDto prepareAiDto(String username) {
        AppUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (user.getPreferences() == null || user.getPreferences().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User preferences are not set. Please update your profile first.");
        }

        List<Book> availableBooks = bookRepository.findByInStockGreaterThan(0);
        List<AiKey> aiKeys = aiKeyRepository.findAll();
        if (aiKeys.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No AI key configured");
        }
        AiKey aiKey = aiKeys.get(0);

        // Build prompt string
        StringBuilder prompt = new StringBuilder();
        prompt.append("PREFERENCES: ").append(user.getPreferences());
        prompt.append(" ____ BOOKS: ");

        for (int i = 0; i < availableBooks.size(); i++) {
            Book b = availableBooks.get(i);
            prompt.append(i + 1)
                  .append("-title: ").append(b.getTitle())
                  .append(" // type: ").append(b.getType())
                  .append(" // author: ").append(b.getAuthor())
                  .append(" // description: ").append(b.getDescription());
            if (i < availableBooks.size() - 1) {
                prompt.append(" || ");
            }
        }

        prompt.append(" ___ ").append(aiKey.getPrompt());

        return new AiDto(prompt.toString(), aiKey.getKey());
    }
}
