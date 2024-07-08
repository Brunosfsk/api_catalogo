import md5 from 'md5';
import jwt from 'jsonwebtoken';
import { db } from '../../BD/BDConect.js';

const getUserByEmail = (email, callback) => {
  const qUser = `
    SELECT id, email, password, type
    FROM users_business 
    WHERE users_business.email = ?
    LIMIT 1
  `;
  db.query(qUser, [email], callback);
};

export class AuthController {
  async authenticate(req, res) {
    const { email, password } = req.body;

    if (!email) return res.status(403).json({ error: 'Insira um E-mail' });
    if (!password) return res.status(403).json({ error: 'Insira uma senha' });

    getUserByEmail(email, (err, data) => {
      if (err) return res.status(500).json({ error: 'Erro interno ao processar requisição', errorDetails: err });
      if (!data[0]) return res.status(403).json({ error: 'Email não cadastrado' });

      const isValuePassword = md5(password);
      if (data[0].password != isValuePassword) return res.status(400).json({ error: 'Senha incorreta' });

      const token = jwt.sign({ id: data[0].id }, process.env.SECRET_TOKEN, { expiresIn: '4h' });
      return res.status(200).json({ id: data[0].id, email, type: data[0].type, token });
    });
  }
}
