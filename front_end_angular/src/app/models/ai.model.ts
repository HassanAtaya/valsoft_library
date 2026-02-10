export interface AiKey {
  id: number;
  name: string;
  key: string;
  prompt: string;
}

export interface AiDto {
  promptAiBooks: string;
  keyAi: string;
}

export interface AiResponse {
  response: string;
  error?: string;
}
