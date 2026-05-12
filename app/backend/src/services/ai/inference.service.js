// AI Inference Service
import { getRuntimeConfig } from '../config/settings.js';

// Runtime adapters
import { inference as llamaInference } from './ai/llama.cpp/inference.js';
import { inference as ollamaInference } from './ai/ollama/inference.js';
import { inference as transformersInference } from './ai/transformers/inference.js';

export async function generateResponse(message, history, options = {}) {
  const config = await getRuntimeConfig();
  const runtime = config.runtime || 'llama';
  
  try {
    let response;
    
    switch (runtime) {
      case 'llama':
        response = await llamaInference(message, history, options);
        break;
      case 'ollama':
        response = await ollamaInference(message, history, options);
        break;
      case 'transformers':
        response = await transformersInference(message, history, options);
        break;
      default:
        response = await llamaInference(message, history, options);
    }
    
    return response;
  } catch (error) {
    console.error('Inference error:', error);
    throw error;
  }
}

// Streaming support
export async function* generateStream(message, history, options = {}) {
  const config = await getRuntimeConfig();
  const runtime = config.runtime || 'llama';
  
  // This is a placeholder - actual streaming depends on runtime
  const response = await generateResponse(message, history, options);
  
  // Yield tokens one by one (simplified)
  const tokens = response.split('');
  for (const token of tokens) {
    yield token;
  }
}