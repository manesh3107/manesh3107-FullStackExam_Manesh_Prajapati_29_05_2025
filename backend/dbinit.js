const pool = require("./config/pgdb");

const initTables = async () => {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,cd
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create orders table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        total NUMERIC,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create order_items table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id TEXT,  -- MongoDB ObjectId stored as string
        name VARCHAR(255),
        price NUMERIC,
        quantity INTEGER
      );
    `);

    console.log("✅ PostgreSQL tables created or already exist.");
  } catch (err) {
    console.error("❌ Error initializing tables:", err.message);
  } finally {
    await pool.end(); // Close connection pool
  }
};

initTables();
