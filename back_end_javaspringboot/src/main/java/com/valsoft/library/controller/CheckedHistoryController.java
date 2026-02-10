package com.valsoft.library.controller;

import com.valsoft.library.dto.CheckInDto;
import com.valsoft.library.entity.CheckedHistory;
import com.valsoft.library.service.CheckedHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
public class CheckedHistoryController {

    @Autowired
    private CheckedHistoryService historyService;

    @GetMapping
    public ResponseEntity<List<CheckedHistory>> getAll() {
        return ResponseEntity.ok(historyService.getAllHistory());
    }

    @PostMapping("/check-in")
    public ResponseEntity<CheckedHistory> checkIn(@RequestBody CheckInDto dto) {
        return ResponseEntity.ok(historyService.checkIn(dto));
    }

    @PostMapping("/check-out/{id}")
    public ResponseEntity<CheckedHistory> checkOut(@PathVariable Long id) {
        return ResponseEntity.ok(historyService.checkOut(id));
    }
}
