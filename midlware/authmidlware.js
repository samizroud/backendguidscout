const jwt = require("jsonwebtoken");
require('dotenv').config()

module.exports = function(req, res, next) {
  //get the token from the header if present
  const token = req.header("x-token") ;
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(402).send("Access denied. No token provided.");

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, process.env.Secret);
        
    req.user = decoded;
    console.log(req.user)
     
    next();
  } catch (ex) {
    //if invalid token
    res.status(402).send("Invalid token.");
  }
};