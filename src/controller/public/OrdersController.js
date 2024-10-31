import { db } from '../../BD/BDConect.js';

const getOrdersByBusiness = (getOrder, callback) => {
  const { bussinessID, bussinessName, active, combo } = getOrder;

  let q = `
    SELECT a.id, a.id_business, a.name, a.description, a.price, a.photo_thumb, a.active, a.combo, a.category, c.name as category_name
    FROM orders_business a
    INNER JOIN users_business b ON a.id_business = b.id 
    INNER JOIN orders_business_category c ON a.category = c.id 
    WHERE 1=1
  `;
  const params = [];

  if (bussinessID) {
    q += ' AND b.id = ?';
    params.push(bussinessID);
  }

  if (bussinessName) {
    q += ' AND b.name_url = ?';
    params.push(bussinessName);
  }

  if (combo) {
    q += ' AND a.combo = ?';
    params.push(Boolean(combo));
  }

  if (typeof active !== 'undefined') {
    q += ' AND a.active = ?';
    params.push(Boolean(active));
  }

  db.query(q, params, callback);
};

const createOrder = (orderData, callback) => {
  const { bussinessID, name, description, price, category, photo_thumb } =
    orderData;
  const q = `
    INSERT INTO orders_business (id_business, name, description, price, category, photo_thumb)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [bussinessID, name, description, price, category, photo_thumb];
  db.query(q, values, callback);
};

const updateOrder = (id, updatedData, callback) => {
  const { name, description, price, category, photo_thumb, active, combo } =
    updatedData;
  let query = 'UPDATE orders_business SET';
  const values = [];

  if (name) {
    query += ' name = ?,';
    values.push(name);
  }
  if (description) {
    query += ' description = ?,';
    values.push(description);
  }
  if (price) {
    query += ' price = ?,';
    values.push(price);
  }

  if (typeof active !== 'undefined') {
    query += ' active = ?,';
    values.push(active);
  }

  if (typeof combo !== 'undefined') {
    query += ' combo = ?,';
    values.push(combo);
  }

  if (category) {
    query += ' category = ?,';
    values.push(category);
  }
  if (photo_thumb) {
    query += ' photo_thumb = ?,';
    values.push(photo_thumb);
  }

  query = query.slice(0, -1);
  query += ' WHERE id = ?';
  values.push(id);

  db.query(query, values, callback);
};

const findRolesCategory = (callback) => {
  const q = `
    SELECT id, name FROM orders_business_category;
  `;
  db.query(q, callback);
};

export class OrdersController {
  async getOrders(req, res) {
    getOrdersByBusiness(req.query, (err, data) => {
      if (err)
        return res
          .status(500)
          .json({
            error: 'Erro interno ao processar requisição',
            errorDetails: err,
          });
      if (!data[0])
        return res.status(404).json({ error: 'Loja não possui itens' });

      return res.status(200).json(data);
    });
  }

  async createOrder(req, res) {
    const { bussinessID, name, description, price, category, photo_thumb } =
      req.body;

    if (
      !bussinessID ||
      !name ||
      !price ||
      !category ||
      !description ||
      !photo_thumb
    ) {
      return res
        .status(400)
        .json({ error: 'Dados incompletos para criação do pedido' });
    }

    createOrder(req.body, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: 'Erro ao criar pedido', errorDetails: err });
      return res
        .status(200)
        .json({
          message: 'Pedido criado com sucesso',
          orderId: result.insertId,
        });
    });
  }

  async updateOrder(req, res) {
    const { id } = req.params;
    const updatedData = req.body;

    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: 'Nenhuma informação foi enviada para atualizar' });
    }

    updateOrder(id, updatedData, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: 'Erro ao atualizar pedido', errorDetails: err });

      return res.status(200).json({ message: 'Pedido atualizado com sucesso' });
    });
  }

  async findRolesCategory(_, res) {
    findRolesCategory((err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: 'Erro ao atualizar pedido', errorDetails: err });

      return res.status(200).json(result);
    });
  }
}
