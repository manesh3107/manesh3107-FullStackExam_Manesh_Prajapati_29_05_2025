const pool = require('../../config/pgdb');
const bcrypt = require('bcrypt');

const User = {
  async create({ name, email, password }) {
    console.log('Creating user:', { name, email });
    const { rows } = await pool.query(
      `INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *`,
      [name, email, password]
    );
    return rows[0];
  },

  async findByEmail(email) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return rows[0];
  },

  // New findOne method: find user by id or any field optionally
  async findOne({ id, email }) {
    let query = 'SELECT * FROM users WHERE ';
    let value;
    if (id) {
      query += 'id = $1';
      value = id;
    } else if (email) {
      query += 'email = $1';
      value = email;
    } else {
      throw new Error('Must provide id or email');
    }
    const { rows } = await pool.query(query, [value]);
    return rows[0];
  }
};

module.exports = User;
