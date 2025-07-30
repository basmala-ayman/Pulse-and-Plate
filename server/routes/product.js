const express = require("express");
const route = express.Router();
const Item = require("../models/item");
const Menu = require("../models/Menu");
const auth = require("../middleware/auth");
const authRole = require("../middleware/authorize");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product and menu management
 */

/**
 * @swagger
 * /api/product/{productName}:
 *   delete:
 *     summary: Delete a product by name
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productName
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Product name missing
 *       404:
 *         description: Product not found
 */
route.delete("/:productName", auth, authRole("admin"), async (req, res) => {
  const productname = req.params.productName;

  if (!productname) {
    return res.status(400).json({ message: "Product name is required." });
  }

  const product = await Item.findOne({ name: productname });

  if (!product) {
    return res.status(404).json({ message: `Product with name "${productname}" not found.` });
  }

  await Item.deleteOne({ _id: product._id });

  const menu = await Menu.findOne();
  if (menu) {
    const category = menu.categories.find(cat => cat.title === product.category);

    if (category) {
      category.items = category.items.filter(
        itemId => itemId.toString() !== product._id.toString()
      );
    }

    await menu.save();
  }

  res.status(200).json({ message: `Product "${productname}" deleted successfully.` });
});

/**
 * @swagger
 * /api/product/add-menu:
 *   post:
 *     summary: Create a new menu
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Menu created successfully
 *       500:
 *         description: Error creating menu
 */
route.post("/add-menu", auth, authRole("admin"), async (req, res) => {
  try {
    const newMenu = new Menu({
      title: "Pulse and Plate Menu",
      categories: []
    });

    await newMenu.save();
    res.status(201).json({ message: "Menu created successfully.", menu: newMenu });
  } catch (error) {
    res.status(500).json({ message: "Error creating menu", error: error.message });
  }
});

/**
 * @swagger
 * /api/product/add-item:
 *   post:
 *     summary: Add a new product item to the menu
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - image
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               calories:
 *                 type: number
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               quantity:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product added and categorized
 *       400:
 *         description: Missing fields or invalid category
 *       409:
 *         description: Product already exists
 *       500:
 *         description: Error adding item
 */
route.post("/add-item", auth, authRole("admin"), async (req, res) => {
  try {
    const { name, image, description, calories, category, price, quantity } = req.body;

    if (!name || !price || !image || !category) {
      return res.status(400).json({ message: "Complete the product missing info" });
    }

    const existingProduct = await Item.findOne({ name });
    if (existingProduct) {
      return res.status(409).json({ message: "Product already added" });
    }

    const newItemData = {
      name,
      photo: image,
      price,
      description,
      calories,
      category,
    };
    if (quantity !== undefined && quantity !== null) {
      newItemData.quantity = quantity;
    }

    const newItem = new Item(newItemData);
    await newItem.save();

    const menu = await Menu.findOne();
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    let categoryFound = menu.categories.find(cat => cat.title === category);

    if (!categoryFound) {
      if (!category || typeof category !== "string" || category.trim() === "") {
        return res.status(400).json({ message: "Category title cannot be empty when creating a new category." });
      }
      categoryFound = {
        title: category.trim(),
        items: [newItem._id],
      };
      menu.categories.push(categoryFound);
    } else {
      categoryFound.items.push(newItem._id);
    }

    await menu.save();

    res.status(201).json({
      message: "Product added successfully and categorized",
      data: newItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding item", error: error.message });
  }
});

/**
 * @swagger
 * /api/product/list:
 *   get:
 *     summary: List all products by category
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products listed by category
 *       404:
 *         description: Menu not found
 *       500:
 *         description: Error listing products
 */
route.get("/list", async (req, res) => {
  try {
    const menu = await Menu.findOne().populate("categories.items");
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    const formatted = menu.categories.map(category => ({
      category: category.title,
      items: category.items.map(p => ({
        name: p.name,
        photo: p.photo,
        description: p.description,
        calories: p.calories,
        category: p.category,
        price: p.price,
        quantity: p.availableCounter,
      }))
    }));

    res.status(200).json({
      message: "Products listed by category",
      menu: formatted
    });
  } catch (error) {
    return res.status(500).json({ message: "Error listing products", error: error.message });
  }
});

/**
 * @swagger
 * /api/product/update/{productName}:
 *   put:
 *     summary: Update a product by name
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productName
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
 *             description: Fields to update
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product or Menu not found
 *       500:
 *         description: Error updating product
 */
route.put("/update/:productName", auth, authRole("admin"), async (req, res) => {
  try {
    const oldProductName = req.params.productName;
    const updates = req.body;

    const oldProduct = await Item.findOne({ name: oldProductName });
    if (!oldProduct) {
      return res.status(404).json({ message: `Product "${oldProductName}" not found.` });
    }

    const originalCategoryTitle = oldProduct.category;

    const updatedProduct = await Item.findOneAndUpdate(
      { name: oldProductName },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(500).json({ message: "Failed to update product details." });
    }

    const menu = await Menu.findOne();
    if (!menu) {
      return res.status(404).json({ message: "Menu not found." });
    }

    const newCategoryTitle = updatedProduct.category;

    if (originalCategoryTitle && originalCategoryTitle !== newCategoryTitle) {
      const oldCategoryInMenu = menu.categories.find(cat => cat.title === originalCategoryTitle);
      if (oldCategoryInMenu) {
        oldCategoryInMenu.items.pull(updatedProduct._id);
      }
    }

    let targetCategoryInMenu = menu.categories.find(cat => cat.title === newCategoryTitle.trim());

    if (targetCategoryInMenu) {
      if (!targetCategoryInMenu.items.some(itemId => itemId.toString() === updatedProduct._id.toString())) {
        targetCategoryInMenu.items.push(updatedProduct._id);
      }
    } else {
      menu.categories.push({
        title: newCategoryTitle.trim(),
        items: [updatedProduct._id]
      });
    }

    await menu.save();

    res.status(200).json({
      message: `Product "${oldProductName}" updated successfully.`,
      product: updatedProduct
    });

  } catch (error) {
    return res.status(500).json({ message: "Error updating product", error: error.message });
  }
});

module.exports = route;
