const express = require("express");
const Order = require("../models/order.js"); 
const Item = require("../models/item.js");   
const User = require("../models/user.js");   
const auth = require("../middleware/auth"); 

const router = express.Router();

//auth here cause of 
router.post("/", auth, async (req, res) => {
    const {itemname} = req.body; 
    const userId = req.user._id; //here to get the number is of the user that making this function 

    if (!itemname) {
        return res.status(400).json({ message: "the item name is required." });
    }

    try {
      const item = await Item.findOne({ name: itemname });
        if (!item) {
            return res.status(404).json({ message: "Item not found." });
        }

        if (item.avilableCounter <= 0) {
            return res.status(400).json({ message: "Item is out of stock." });
        }

        const newOrder = new Order({
            user: userId,
            item: item._id,
        });
        await newOrder.save(); //saving the order in the data base

        item.avilableCounter -= 1;
        await item.save(); //and this is for saving the quantity of this item in the daa base too

        const user = await User.findById(userId);//but here is to get the full object of this user 

        if (!user) {

            console.error("User not found after order creation, order ID:", newOrder._id);

            try {
              await Order.findByIdAndDelete(newOrder._id);
              console.log(`Orphaned order (ID: ${newOrder._id}) deleted successfully.`);
                } catch (deleteError) {
              console.error(`Failed to delete orphaned order (ID: ${newOrder._id}).`, deleteError);
                }
          
          return res.status(500).json({ 
              message: "Order created but the user not found so The order has been cancelled.", 
          });
        }

        user.ordersList.push(newOrder._id);
        await user.save(); 

        res.status(201).json({ message: "Order created successfully", order: newOrder });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Error creating order.", error: error.message });
    }
});

module.exports = router;
