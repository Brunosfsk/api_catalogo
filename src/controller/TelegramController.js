import { TelegramService } from '../services/TelegramService.js';

const telegramService = new TelegramService();

export class TelegramController {
  async sendMessageTelegram(req, res) {
    const data = req.body; // Pegando os dados do corpo da requisição
    try {
      const response = await telegramService.sendMessageTelegram(data);
      res.send(response);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
