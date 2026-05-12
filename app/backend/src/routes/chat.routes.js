// Chat Routes
import express from 'express';
import { sendMessage, getChatHistory, clearChat } from '../controllers/chat.controller.js';

const router = express.Router();

// Send message
router.post('/', sendMessage);

// Get chat history
router.get('/:chatId', getChatHistory);

// Delete chat
router.delete('/:chatId', clearChat);

export default router;