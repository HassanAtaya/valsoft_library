package com.valsoft.library.repository;

import com.valsoft.library.entity.AiKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AiKeyRepository extends JpaRepository<AiKey, Long> {
}
