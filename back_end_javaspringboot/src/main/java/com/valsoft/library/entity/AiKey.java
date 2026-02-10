package com.valsoft.library.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ai_keys")
public class AiKey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "`key`")
    private String key;

    @Column(columnDefinition = "TEXT")
    private String prompt;

    public AiKey() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getKey() { return key; }
    public void setKey(String key) { this.key = key; }

    public String getPrompt() { return prompt; }
    public void setPrompt(String prompt) { this.prompt = prompt; }
}
