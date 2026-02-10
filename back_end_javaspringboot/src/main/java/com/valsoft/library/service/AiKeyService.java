package com.valsoft.library.service;

import com.valsoft.library.entity.AiKey;
import com.valsoft.library.repository.AiKeyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AiKeyService {

    @Autowired
    private AiKeyRepository aiKeyRepository;

    public List<AiKey> getAllAiKeys() {
        return aiKeyRepository.findAll();
    }

    public AiKey updateAiKey(Long id, AiKey data) {
        AiKey aiKey = aiKeyRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "AI Key not found"));
        if (data.getKey() != null) aiKey.setKey(data.getKey());
        if (data.getPrompt() != null) aiKey.setPrompt(data.getPrompt());
        return aiKeyRepository.save(aiKey);
    }
}
