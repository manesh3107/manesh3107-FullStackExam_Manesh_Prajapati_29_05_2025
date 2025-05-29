const pool = require('../config/pgdb');
const Product = require('../models/mongodb/product');

exports.topSpenders = async (req, res) => {
  const { rows } = await pool.query(`
    SELECT users.name, SUM(orders.total) AS spent
    FROM users
    JOIN orders ON users.id = orders.user_id
    GROUP BY users.id
    ORDER BY spent DESC
    LIMIT 3;
  `);
  res.json(rows);
};

exports.salesByCategory = async (req, res) => {
  const result = await Product.aggregate([
    { $group: { _id: '$category', total: { $sum: 1 } } }
  ]);
  res.json(result);
};
