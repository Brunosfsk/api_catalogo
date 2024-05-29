import { db } from "../BD/BDConect.js"

export class AuthController {
  async authenticate(req, res) {
    const { email, password } = req.body
    const isValuePassword = md5(password)
    const qUser = `
    SELECT username, password
    FROM users 
    WHERE users.username = ?
    LIMIT 1
    `

    if (!user) return res.status(403).json({ error: 'Insira um usuário' })
    if (!password) return res.status(403).json({ error: 'Insira uma senha' })

    // db.query(qUser, [user], (err, data) => {
    //   if (err) return res.json({ error: 'erro interno ao processar requisição', errorDetails: err })
    //   if (!data[0]) return res.status(403).json({ error: 'usuario não existe' })
    //   if (data[0].password == isValuePassword) return res.status(400).json({ error: 'senha incorreta' })
    //   return res.status(200).json({ id: 1, email })
    // })

    const emails = [
      {
        id: 1,
        email: "roberto@gmail.com",
        password: "roberto123",
      },
      {
        id: 2,
        email: "joaogomes@gmail.com",
        password: "joaogomes123",
      },
      {
        id: 3,
        email: "alessandro@gmail.com",
        password: "alessandro123",
      }
    ]

    const emailJson = emails.filter((item) => item.email.includes(email))
    const passwordJson = emails.filter((item) => item.password.includes(password))


    if (email != emailJson[0]?.email) return res.status(403).json({ error: 'usuario não existe' })
    if (password != passwordJson[0]?.password) return res.status(403).json({ error: 'senha incorreta' })

    return res.status(200).json({
      id: 1,
      email
    })
  }
}