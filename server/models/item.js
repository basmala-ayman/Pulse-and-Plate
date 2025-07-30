// //first thing is define the needed library
// const mongoose = require('mongoose')
// //secind thing is to making a schema object
// const schema = mongoose.Schema
// //third thing is to starting define the schema structure
// const itemSchema = new schema({
//   //lets now define the attribute fields


//   //there is maybe another extra feature that about the reviews of each item from the users 
//   name: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   photo: {
//     type: String,//inside the string we will store the url of the photo and there is will be an API for getting the items info each time 
//     required: true
//   },
//   description: {
//     type: String,
//     required: false
//   },
//   calories: {
//     type: Number,
//     required: false
//   },
//   category: {
//     type: String,
//     required: false
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   avilableCounter: {
//     type: Number,
//     required: false,
//     default: 15 //from each item we will start with it by 15 items 
//   }
// });

// module.exports = mongoose.model('Item', itemSchema);
const mongoose = require("mongoose");
const schema = mongoose.Schema;


const itemSchema = new schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  photo: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  calories: {
    type: Number,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  availableCounter: {
    type: Number,
    required: false,
    default: 15 // البدء بكمية معينة لكل منتج
  }
});

module.exports = mongoose.model("Item", itemSchema);
