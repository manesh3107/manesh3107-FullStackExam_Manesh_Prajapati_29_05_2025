const Order = require("../models/pgsql/order");
const OrderItem = require("../models/pgsql/orderItem");
const Cart = require("../models/mongodb/cart");
const Product = require("../models/mongodb/product");

exports.checkout = async (req, res) => {
  console.log("Checkout initiated");
  const userId = req.user.id;

  const cart = await Cart.findOne({ userId });
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  // Fetch full product details for each cart item
  const enrichedItems = await Promise.all(
    cart.items.map(async (item) => {
      if (!item.productId) return null;

      const product = await Product.findById(item.productId).lean();
      if (!product) return null;

      const quantity = item.quantity || 1;

      return {
        productId: product._id.toString(),
        name: product.name,
        price: product.price,
        quantity,
      };
    })
  );

  const validItems = enrichedItems.filter(Boolean);

  if (validItems.length === 0) {
    return res.status(400).json({ message: "Cart contains invalid products" });
  }

  const total = validItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await Order.create(userId, total);
  await OrderItem.bulkCreate(order.id, validItems);
  await Cart.findOneAndUpdate({ userId }, { items: [] });

  res.json({ message: "Order placed", order });
};


exports.orderHistory = async (req, res) => {
  const orders = await Order.findByUser(req.user.id);
  res.json(orders);
};
