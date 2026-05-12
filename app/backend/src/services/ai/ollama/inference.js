// Ollama Inference
export async function inference(message, history, options = {}) {
  const config = {
    baseURL: options.baseURL || 'http://localhost:11434',
    model: options.model || 'llama2'
  };
  
  try {
    const response = await fetch(`${config.baseURL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.model,
        prompt: buildPrompt(message, history),
        stream: false
      })
    });
    
    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Ollama inference error:', error);
    // Fallback to simulated response
    return simulatedOllamaResponse(message);
  }
}

function buildPrompt(message, history) {
  const context = history
    .slice(-10)
    .map(msg => `${msg.role}: ${msg.content}`)
    .join('\n');
  
  return `Context:\n${context}\n\nUser: ${message}\nAssistant:`;
}

function simulatedOllamaResponse(message) {
  return `Ollama is not running. To use Ollama, install and start it on your system.`;
}

export default { inference };