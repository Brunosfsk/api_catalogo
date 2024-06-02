import md5 from "md5"
import jwt from 'jsonwebtoken'
import { db } from "../../BD/BDConect.js"

export class AuthController {
  async authenticate(req, res) {
    const { email, password } = req.body
    const isValuePassword = md5(password)
    const qUser = `
    SELECT id, email, password
    FROM users_business 
    WHERE users_business.email = ?
    LIMIT 1
    `

    if (!email) return res.status(403).json({ error: 'Insira um E-mail' })
    if (!password) return res.status(403).json({ error: 'Insira uma senha' })

    db.query(qUser, [email], (err, data) => {
      if (err) return res.json({ error: 'erro interno ao processar requisição', errorDetails: err })
      if (!data[0]) return res.status(403).json({ error: 'Email não cadastrado' })
      if (data[0].password != isValuePassword) return res.status(400).json({ error: 'Senha incorreta' })
      return res.status(200).json({
        id: data[0].id,
        email,
        token: jwt.sign({ id: data[0].id }, process.env.SECRET_TOKEN, { expiresIn: '4h' })
      })
    })
  }
}