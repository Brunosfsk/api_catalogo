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

const createOrder = (orderData, callback) => {
  const { id_business, name, description, price, category, photo_thumb } = orderData;
  const q = `
    INSERT INTO orders_business (id_business, name, description, price, category, photo_thumb)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [id_business, name, description, price, category, photo_thumb];
  db.query(q, values, callback);
};


const updateOrder = (id, updatedData, callback) => {
  const { name, description, price, category, photo_thumb } = updatedData;
  const q = `
    UPDATE orders_business 
    SET name = ?, description = ?, price = ?, category = ?, photo_thumb = ?
    WHERE id = ?
  `;
  const values = [name, description, price, category, photo_thumb, id];
  db.query(q, values, callback);
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

  async createOrder(req, res) {
    const { id_business, name, description, price, category, photo_thumb } = req.body;

    if (!id_business || !name || !price || !category) {
      return res.status(400).json({ error: 'Dados incompletos para criação do pedido' });
    }

    createOrder(req.body, (err, result) => {
      if (err) return res.status(500).json({ error: 'Erro ao criar pedido', errorDetails: err });

      return res.status(201).json({ message: 'Pedido criado com sucesso', orderId: result.insertId });
    });
  }

  async updateOrder(req, res) {
    const { id } = req.params;
    const { name, description, price, category, photo_thumb } = req.body;

    if (!name && !description && !price && !category && !photo_thumb) {
      return res.status(400).json({ error: 'Nenhuma informação foi enviada para atualizar' });
    }

    updateOrder(id, req.body, (err, result) => {
      if (err) return res.status(500).json({ error: 'Erro ao atualizar pedido', errorDetails: err });

      return res.status(200).json({ message: 'Pedido atualizado com sucesso' });
    });
  }
}
