//first thing which is very important in creating each collection file 
//is to import the monoose linbrary to can define the schemas and use the models inside this lib

const mongoose = require('mongoose')
//importing the installed bcrypt linrary to can use it later
const bcrypt = require('bcrypt')
//now we will need to define an object from the schema class 
const schema = mongoose.Schema


//now lets define our user schema and define its attributes 
const userSchema = new schema({
  //now each field which is the attribute having 4 things must be defined when creating the schema and there is more things 
  /*
    type: DataType,         // e.g., String, Number, Date, Boolean, etc.
    required: true/false,   // Is this field required?
    unique: true/false,     // Should this field be unique?
    default: value,         // (Optional) default value
  
  */
  id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  token: {
    type: String,
    required: false
  },
  ordersList: [{//this list is to store all the history orders that the user made until now 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }]


});

//the password of the user must be encrypted before saving it inside the database and that by using a hash function 
//so the library we will use is the "bcrypt" so the first step is to install it 
//here we will use the pre save function that ensure that the hashing happened before saving inside the database 
//this function will be async cause i will use await function here to ensure that there is no any code after this line in this file 
//will work until the encryption done to ensure the passwords will be saved into the database encrypted 
//and in the same time i want the any other code that it doesnot dependent on the password encryption continue and doesnot stop 

// userSchema.pre("save",async function (next) {
// // i need to check that first it is new password not any changing happened into the password
// //so we will encrypt the password in just 2 cases : register or update the password only otherwise we will not make this encryption
// if(this.isModified("password"))//if it modifies so we will encrypt it before saving 
// {//in the modified function you must pass the filed attribute name on it 
// const habiba_salt=await bcrypt.genSalt(10);
// this.password=await bcrypt.hash(this.password,habiba_salt);
// //and after finish call the mongo to come and store the result into the database 
// next();
// }
// else//so we will not make encrypted to the password again so we will return 
// {
// return next();//the next function here is to call mongo and tell it i finish come to save the data inside the daa base 
// }
// })

// userSchema.pre('save', async function (next) {
//   if (this.isNew) { // Only increment id for new documents
//     try {
//       // Find max id in existing users
//       const lastUser = await mongoose.model('User').findOne().sort({ id: -1 }).exec();
//       this.id = lastUser ? lastUser.id + 1 : 1;  // start from 1 if no user exists
//     } catch (err) {
//       return next(err);
//     }
//   }
//   next();
// });

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next(); // Skip hashing if password is not modified

//   try {
//     const salt = await bcrypt.genSalt(10); // Generate salt
//     this.password = await bcrypt.hash(this.password, salt); // Hash the password
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

userSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  try {
    const lastUser = await mongoose.model('User')
      .findOne().sort({ id: -1 }).exec();
    this.id = lastUser ? lastUser.id + 1 : 1;
    next();
  } catch (err) {
    next(err);
  }
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    // if password wasn’t touched, skip
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};
/*
- the next function is used for telling the mono that i finish cause if i didnot use it it will still forever in the asyn function
-the number inside the densalt is the number of rounds and it indicatee to how the hashing is complex the 10 is the most common used number 
and that cause if we increase the number the password become more secure but in the same time it takes most cpu time so become slower
and the vice versa
*/

//now last thing is to save this schema into model to can use it in any other files to can interactive with it
//for making any inserting or updating or deleting 
module.exports = mongoose.model('User', userSchema);
// module.exports = User;
