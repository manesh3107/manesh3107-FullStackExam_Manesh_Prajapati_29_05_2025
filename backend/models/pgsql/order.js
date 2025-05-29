const pool = require('../../config/pgdb');

const Order = {
  async create(userId, total) {
    const { rows } = await pool.query(
      `INSERT INTO orders(user_id, total) VALUES($1, $2) RETURNING *`,
      [userId, total]
    );
    return rows[0];
  },

  async findByUser(userId) {
    const { rows } = await pool.query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return rows;
  }
};

module.exports = Order;
