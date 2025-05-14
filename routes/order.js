const express = require("express");

const Order = require("../models/order.js"); 
const Item = require("../models/item.js");   
const User = require("../models/user.js");   
const auth = require("../middleware/auth"); 

const router = express.Router();


// makign the get order function and returning the item info
// now in this function the front team will send the name of the item that the user choosen it to added in the cart 
//and will use this api to get all the information related to this item
router.get("/item/name/:name", async (req, res) => {
  const itemName = req.params.name;
  try {
    const item = await Item.findOne({ name: itemName });
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({
      message: "Item info returned successfully",
      item: item
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching item", error: err.message });
  }
});

//now after the front taking the item information and showing it in the cart page they will need to send 
//the item name again but with the number of quantites the user is ordered for it and this will happened by this 
// we will use the aith here to ensure that the loggend users who is making this request 
router.post("/", auth, async (req, res) => {
  const { itemname, quantity } = req.body;
  const userId = req.user._id;

  // Basic validation
  if (!itemname ) {
    return res.status(400).json({
      message: "Item name  is required.",
    });
  }

  if ( !quantity || quantity <= 0) {
    return res.status(400).json({
      message: "valid quantity is required.",
    });
  }


  try {
    // first we will need to check that this item name is existed 
    const item = await Item.findOne({ name: itemname });
    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    // second checking that the available counter of this item is less than the asked quantity 
    if (item.avilableCounter < quantity) {
      return res.status(400).json({
        message: `Only ${item.avilableCounter} items are available in stock.`,
      });
    }

    const newOrder = new Order({
      user: userId,
      item: item._id,
      quantity,
    });
    await newOrder.save();

    item.avilableCounter -= quantity;
    await item.save();

    // adding this order to the user order list 
    const user = await User.findById(userId);
    if (!user) {
      await Order.findByIdAndDelete(newOrder._id);
      return res.status(500).json({
        message: "Order created but user not found. The order has been cancelled.",
      });
    }

    user.ordersList.push(newOrder._id);
    await user.save();

    res.status(201).json({
      message: "Order created successfully.",
      order: newOrder,
    });

  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({
      message: "Something went wrong while processing the order.",
      error: error.message,
    });
  }
});


module.exports = router;
