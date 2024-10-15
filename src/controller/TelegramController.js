import { TelegramService } from '../services/TelegramService.js';

const telegramService = new TelegramService()

export class TelegramController {
    async sendMessageTelegram(req, res) {
        try {
            const response =  telegramService.sendMessageTelegram();
            res.send({ ...response });
        } catch (err) {
            res.status(500).send(err);
        }
    }

}



