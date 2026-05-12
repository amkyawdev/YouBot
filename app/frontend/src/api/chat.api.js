// Chat API - Backend communication
const API_BASE = '/api';

export async function sendChatMessage(message, options = {}) {
  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, ...options })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Chat API error:', error);
    throw error;
  }
}

export async function getChatHistory(chatId) {
  try {
    const response = await fetch(`${API_BASE}/chat/${chatId}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Get chat history error:', error);
    return [];
  }
}

export async function clearChatHistory(chatId) {
  try {
    const response = await fetch(`${API_BASE}/chat/${chatId}`, { method: 'DELETE' });
    return response.ok;
  } catch (error) {
    console.error('Clear chat error:', error);
    return false;
  }
}

// Export
window.ChatAPI = { sendChatMessage, getChatHistory, clearChatHistory };