package com.valsoft.library.controller;

import com.valsoft.library.entity.AiKey;
import com.valsoft.library.service.AiKeyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ai-keys")
public class AiKeyController {

    @Autowired
    private AiKeyService aiKeyService;

    @GetMapping
    public ResponseEntity<List<AiKey>> getAll() {
        return ResponseEntity.ok(aiKeyService.getAllAiKeys());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AiKey> update(@PathVariable Long id, @RequestBody AiKey data) {
        return ResponseEntity.ok(aiKeyService.updateAiKey(id, data));
    }
}
