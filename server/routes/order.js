const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management (cart, checkout, item info)
 */

const Order = require('../models/order');
const Item = require('../models/item');
const User = require('../models/user');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/addorder:
 *   get:
 *     summary: Get all orders (admin use)
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders
 *       500:
 *         description: Failed to fetch orders
 */
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});

/**
 * @swagger
 * /api/addorder/item/name/{name}:
 *   get:
 *     summary: Get item info by name
 *     tags: [Orders]
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item found
 *       404:
 *         description: Item not found
 */
router.get("/item/name/:name", async (req, res) => {
  const itemName = req.params.name;
  try {
    const item = await Item.findOne({ name: itemName });
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Item info returned successfully", item });
  } catch (err) {
    res.status(500).json({ message: "Error fetching item", error: err.message });
  }
});

/**
 * @swagger
 * /api/addorder:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemname:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", auth, async (req, res) => {
  const { itemname, quantity } = req.body;
  const userId = req.user.userId;

  if (!itemname) return res.status(400).json({ message: "Item name is required." });
  if (!quantity || quantity <= 0) return res.status(400).json({ message: "Valid quantity is required." });

  try {
    const item = await Item.findOne({ name: itemname });
    if (!item) return res.status(404).json({ message: "Item not found." });
    if (item.availableCounter < quantity) {
      return res.status(400).json({ message: `Only ${item.availableCounter} items are available in stock.` });
    }

    const newOrder = new Order({ user: userId, item: item._id, quantity });
    await newOrder.save();

    item.availableCounter -= quantity;
    await item.save();

    const user = await User.findById(userId);
    if (!user) {
      await Order.findByIdAndDelete(newOrder._id);
      return res.status(500).json({ message: "Order created but user not found. The order has been cancelled." });
    }

    user.ordersList.push(newOrder._id);
    await user.save();

    res.status(201).json({ message: "Order created successfully.", order: newOrder });
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ message: "Something went wrong while processing the order.", error: error.message });
  }
});

/**
 * @swagger
 * /api/addorder/myorders:
 *   get:
 *     summary: Get current user's cart orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart items
 *       500:
 *         description: Failed to fetch orders
 */
router.get("/myorders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate("item");
    const cart = orders.map(order => ({
      _id: order._id,
      name: order.item.name,
      price: order.item.price,
      photo: order.item.photo,
      quantity: order.quantity,
    }));
    res.json({ cart });
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/**
 * @swagger
 * /api/addorder/cart/{id}:
 *   put:
 *     summary: Update order quantity
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Quantity updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Order not found
 */
router.put("/cart/:id", auth, async (req, res) => {
  const { quantity } = req.body;
  if (quantity <= 0) return res.status(400).json({ message: "Quantity must be greater than 0" });

  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.userId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.quantity = quantity;
    await order.save();
    res.json({ message: "Quantity updated" });
  } catch (err) {
    console.error("Error updating quantity:", err);
    res.status(500).json({ message: "Failed to update quantity" });
  }
});

/**
 * @swagger
 * /api/addorder/cart/{id}:
 *   delete:
 *     summary: Delete order by ID from cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted
 *       404:
 *         description: Order not found
 */
router.delete("/cart/:id", auth, async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findOne({ _id: orderId, user: req.user.userId }).populate("item");
    if (!order) return res.status(404).json({ message: "Order not found" });

    const item = order.item;
    item.availableCounter += order.quantity;
    await item.save();

    const user = await User.findById(req.user.userId);
    if (user) {
      user.ordersList = user.ordersList.filter(id => id.toString() !== orderId);
      await user.save();
    }

    await order.deleteOne();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order", error: error.message });
  }
});

/**
 * @swagger
 * /api/addorder/clearcart:
 *   delete:
 *     summary: Clear all user's cart items
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All cart items cleared
 *       500:
 *         description: Failed to clear cart
 */
router.delete("/clearcart", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.find({ user: userId });

    for (const order of orders) {
      const item = await Item.findById(order.item);
      if (item) {
        item.availableCounter += order.quantity;
        await item.save();
      }
    }

    await User.findByIdAndUpdate(userId, { $set: { ordersList: [] } });
    await Order.deleteMany({ user: userId });

    res.status(200).json({ message: "All cart items cleared successfully." });
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ message: "Failed to clear cart", error: err.message });
  }
});

module.exports = router;
