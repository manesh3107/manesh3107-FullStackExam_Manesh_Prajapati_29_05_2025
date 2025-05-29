const Cart = require("../models/mongodb/cart");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId"
    );
    if (!cart) {
      return res.status(200).json({ items: [], message: "Cart is empty" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, name, price, quantity } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $push: { items: { productId, name, price, quantity } } },
      { upsert: true, new: true }
    );
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};
