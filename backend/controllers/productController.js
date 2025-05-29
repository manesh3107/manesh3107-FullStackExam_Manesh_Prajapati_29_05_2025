const Product = require('../models/mongodb/product');

// List Products with Search, Category Filter, and Pagination
exports.list = async (req, res) => {
  const { search, category, page = 1, limit = 10 } = req.query;
  const query = {};

  // Search by product name
  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  // Filter by category
  if (category) {
    query.category = category;
  }

  try {
    const totalCount = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (err) {
    console.error("Product listing error:", err);
    res.status(500).json({ error: "Server error while listing products" });
  }
};

// Get Single Product by ID
exports.get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json(product);
  } catch (err) {
    console.error("Product fetch error:", err);
    res.status(500).json({ error: "Server error while fetching product" });
  }
};
