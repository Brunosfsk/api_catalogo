import { db } from '../../BD/BDConect.js';

const getOrdersByBusiness = (nameBussiness, callback) => {
  const q = `
    SELECT a.id, a.id_business, a.name, a.description, a.price, a.photo_thumb, c.name as category
    FROM orders_business a
    INNER JOIN users_business b ON a.id_business = b.id 
    INNER JOIN orders_business_category c ON a.category = c.id 
    WHERE b.name_url = ?
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
