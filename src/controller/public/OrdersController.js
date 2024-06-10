import { db } from "../../BD/BDConect.js"

export class OrdersController {
  async getOrders(req, res) {
    const { nameBussiness } = req.query

    const q = `
      SELECT orders_business.id, orders_business.id_business, orders_business.name, orders_business.description, orders_business.price, orders_business.photo_thumb 
      FROM orders_business 
      INNER JOIN users_business 
      ON orders_business.id_business = users_business.id 
      WHERE users_business.name_url = ?
    `
    if (!nameBussiness) return res.json({ error: 'informação base não foi enviada' })

    db.query(q, [nameBussiness], (err, data) => {
      if (err) return res.json({ error: 'erro interno ao processar requisição', errorDetails: err })
      if (!data[0]) return res.status(403).json({ error: 'Loja não possui items' })
      return res.status(200).json(data)
    })

  }
}