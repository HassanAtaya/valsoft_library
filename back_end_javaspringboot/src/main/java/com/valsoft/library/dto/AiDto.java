package com.valsoft.library.dto;

public class AiDto {
    private String promptAiBooks;
    private String keyAi;

    public AiDto() {}

    public AiDto(String promptAiBooks, String keyAi) {
        this.promptAiBooks = promptAiBooks;
        this.keyAi = keyAi;
    }

    public String getPromptAiBooks() { return promptAiBooks; }
    public void setPromptAiBooks(String promptAiBooks) { this.promptAiBooks = promptAiBooks; }

    public String getKeyAi() { return keyAi; }
    public void setKeyAi(String keyAi) { this.keyAi = keyAi; }
}
