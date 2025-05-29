const pool = require('../../config/pgdb');

const OrderItem = {
  async bulkCreate(orderId, items) {
    const values = items.map(
      (item, i) =>
        `($1, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4}, $${i * 4 + 5})`
    ).join(', ');

    const flat = items.flatMap(item => [
      item.productId,
      item.name,
      item.price,
      item.quantity
    ]);

    await pool.query(
      `INSERT INTO order_items(order_id, product_id, name, price, quantity) VALUES ${values}`,
      [orderId, ...flat]
    );
  }
};

module.exports = OrderItem;
