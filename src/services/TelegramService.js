import axios from 'axios';
import { templateMessage } from '../utils/templateMessage.js';

export class TelegramService {
  async sendMessageTelegram(data) {
    const options = {
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    };
    const url = `${process.env.APITOKEN}/sendMessage?chat_id=${
      process.env.CHAT_ID
    }&text=${encodeURI(templateMessage(data))}&parse_mode=markdown`;

    try {
      const response = await axios.get(url, options);
      return response.data;
    } catch (error) {
      console.error(
        'Erro ao enviar a mensagem:',
        error.response ? error.response.data : error.message,
      );
      throw error;
    }
  }
}
