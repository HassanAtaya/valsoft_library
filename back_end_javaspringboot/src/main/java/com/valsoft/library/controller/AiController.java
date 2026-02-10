package com.valsoft.library.controller;

import com.valsoft.library.dto.AiDto;
import com.valsoft.library.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    @Autowired
    private AiService aiService;

    @GetMapping("/prepare")
    public ResponseEntity<AiDto> prepareAi(Authentication auth) {
        return ResponseEntity.ok(aiService.prepareAiDto(auth.getName()));
    }
}
