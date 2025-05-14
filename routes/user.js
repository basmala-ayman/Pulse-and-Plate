const express = require('express');
const router = express.Router();
const User = require('../models/user')
const auth = require('../middleware/auth');


router.get('/', async (req, res) => {
  try {
      const users = await User.find({}, '-password'); 
      res.status(200).json(users);
  } catch (error) {
      console.error("Error fetching all users:", error);
      res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
});

router.get('/profile', auth, (req, res) => {
  res.json({ message: 'Welcome, authenticated user!', user: req.user });
});


// writing the code of delete user function 
//tjis function will be auth to ensure the authorization and the admin is the only person who can delete the user 
router.delete('/:userID', auth, async (req, res) => {

  if (!req.user || req.user.role !== "admin") { //that means it is a normal user want to make things to allowed to him
    return res.status(403).json({ message: "Forbidden: Only admins can delete users." });
  }


  const userid = req.params.userID;
  let numberuserid;
  if (!userid) { return res.status(400).json({ message: "User ID parameter is required." }); }

  numberuserid = Number(userid);
  if (isNaN(numberuserid)) { return res.status(400).json({ message: "User ID must be a valid number." }); }
  const findinguser = await User.findOneAndDelete({ id: numberuserid });
  if (!findinguser) { return res.status(404).json({ message: `User with ID "${numberuserid}" not found.` }); }

  res.status(200).json({ message: `User with ID "${numberuserid}" deleted successfully.` });

})



module.exports = router;
