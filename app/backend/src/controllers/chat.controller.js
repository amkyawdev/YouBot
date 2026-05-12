// Chat Controller
import { v4 as uuidv4 } from 'uuid';
import { generateResponse } from '../services/ai/inference.service.js';
import { saveChat, getChat, deleteChat } from '../services/database/sqlite/chat.js';

export async function sendMessage(req, res, next) {
  try {
    const { message, chatId, options } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Get or create chat ID
    const currentChatId = chatId || uuidv4();
    
    // Get chat history
    const history = await getChat(currentChatId);
    
    // Add user message to history
    history.push({ role: 'user', content: message, timestamp: new Date().toISOString() });
    
    // Generate AI response
    const response = await generateResponse(message, history, options);
    
    // Add assistant message to history
    history.push({ role: 'assistant', content: response, timestamp: new Date().toISOString() });
    
    // Save chat
    await saveChat(currentChatId, history);
    
    res.json({
      chatId: currentChatId,
      message: response,
      history
    });
  } catch (error) {
    next(error);
  }
}

export async function getChatHistory(req, res, next) {
  try {
    const { chatId } = req.params;
    const history = await getChat(chatId);
    
    res.json({ chatId, history: history || [] });
  } catch (error) {
    next(error);
  }
}

export async function clearChat(req, res, next) {
  try {
    const { chatId } = req.params;
    await deleteChat(chatId);
    
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}