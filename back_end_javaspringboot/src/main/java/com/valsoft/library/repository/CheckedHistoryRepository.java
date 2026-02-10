package com.valsoft.library.repository;

import com.valsoft.library.entity.CheckedHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckedHistoryRepository extends JpaRepository<CheckedHistory, Long> {
}
