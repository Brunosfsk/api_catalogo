import {APITOKEN, CHAT_ID} from "../utils/constants.js";
import axios from "axios";
import {templateMessage} from "../utils/templateMessage.js";

export class TelegramService {

    async sendMessageTelegram() {
        const options = {headers: {'Content-Type': 'application/json;charset=UTF-8'}};
        const url = `${APITOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURI(templateMessage())}&parse_mode=markdown`

        try {
            const response = await axios.get(url, options);
            console.log('Mensagem enviada:', response.data);
        } catch (error) {
            console.error('Erro ao enviar a mensagem:', error.response ? error.response.data : error.message);
        }

    }

}
