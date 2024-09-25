import { db } from "../../BD/BDConect.js";

const findUnique = (url, callback) => {
  const q = `
    SELECT id, business, url
    FROM business
    WHERE url = ?;
  `;
  db.query(q, [url], callback);
}

export class BusinessController {
  async findUnique(req, res) {
    const { url } = req.params

    findUnique(url, (err, data) => {
      if (err) return res.status(500).json({ error: 'Erro ao atualizar pedido', errorDetails: err });
      return res.status(200).json(data);
    })
  }
}