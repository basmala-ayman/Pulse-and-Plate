// const mongoose = require('mongoose')

// const schema = mongoose.Schema




// const MenuSchema = new schema({
//     title:
//     {
//       type: String,
//       default: 'Pulse and Plate Menu'
//     },
//     item: [
//       {
//         type: mongoose.Schema.ObjectId,
//         //  It's Item not item!!!!!!!!!!!
//         // ref: "item", THIS ISSSS WORNGGGG
//         ref: "Item,",
//       },
//     ]

//   });

//   module.exports = mongoose.model('Menu', MenuSchema);
// const mongoose = require("mongoose");

// const schema = mongoose.Schema;

// // Defining a category schema
// const CategorySchema = new schema({
//   title: {
//     type: String,
//     required: true, // Category title is required
//   },
//   item: [
//     {
//       type: mongoose.Schema.ObjectId,
//       //  It's Item not item!!!!!!!!!!!
//       // ref: "item", THIS ISSSS WORNGGGG
//       ref: "Item",
//     },
//   ],
// });

// const MenuSchema = new schema({
//   title: {
//     type: String,
//     default: "Pulse and Plate Menu",
//   },
//   categories: [CategorySchema], // Array of categories, each containing a title and items
// });

// module.exports = mongoose.model("Menu", MenuSchema);


const mongoose = require("mongoose");
const schema = mongoose.Schema;

const CategorySchema = new schema({
  title: {
    type: String,
    required: true, // Category title is required
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,  // إضافة نوع الـ ObjectId هنا
      ref: "Item", // ده صح طالما الـ Item هو الاسم الصحيح للموديل
    },
  ],
});

const MenuSchema = new schema({
  title: {
    type: String,
    default: "Pulse and Plate Menu",
  },
  categories: [CategorySchema], // Array of categories, each containing a title and items
});

module.exports = mongoose.model("Menu", MenuSchema);
