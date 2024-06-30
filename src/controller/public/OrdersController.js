import { db } from '../../BD/BDConect.js';

const getOrdersByBusiness = (nameBussiness, callback) => {
  const q = `
    SELECT orders_business.id, orders_business.id_business, orders_business.name, orders_business.description, orders_business.price, orders_business.photo_thumb 
    FROM orders_business 
    INNER JOIN users_business 
    ON orders_business.id_business = users_business.id 
    WHERE users_business.name_url = ?
  `;
  db.query(q, [nameBussiness], callback);
};

export class OrdersController {
  async getOrders(req, res) {
    const { nameBussiness } = req.query;

    if (!nameBussiness) return res.status(400).json({ error: 'informação base não foi enviada' });

    getOrdersByBusiness(nameBussiness, (err, data) => {
      if (err) return res.status(500).json({ error: 'Erro interno ao processar requisição', errorDetails: err });
      if (!data[0]) return res.status(404).json({ error: 'Loja não possui itens' });

      return res.status(200).json(data);
    });
  }
}
