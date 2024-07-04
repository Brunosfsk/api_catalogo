import { db } from "../../BD/BDConect.js"

export class ProspectsController {
  async getProspects(req, res) {

    const q = `
      SELECT id, comercio, segmento, representante_ba, responsavel, contato, cidade, bairro, rua, cep 
      FROM prospects 
    `
    // if (!data) return res.json({ error: 'informação base não foi enviada' })

    db.query(q, (err, data) => {
      if (err) return res.json({ error: 'erro interno ao processar requisição', errorDetails: err })
      if (!data[0]) return res.status(403).json({ error: 'Nenhum prospect encontrado' })
      return res.status(200).json(data)
    })

  }
}