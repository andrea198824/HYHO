'use strict'
const { Admin, Category, Form, Order, Products, User } = require('../db');


// exports.post = async function(req, res){
//     let reg = []
//     try {
//         const userCheck = await User.findOne({ email: req.body.email });
    
//         if (!userCheck)
//           return res.status(400).json({
//             status: "fail",
//             message: "The user does not exist",
//           });
    
//         const user = await User.findOne(req.body);
    
//         if (!user)
//           return res.status(400).json({
//             status: "fail",
//             message: "Incorrect password!",
//           });
    
//         res.status(200).json({ status: "success", data: { user } });
//       } catch (error) {
//         res.status(400).json({ status: "fail", message: error.message });
//       }
//     };

    //singout
    exports.post = (req, res) => {
        res.clearCookie("token");
        res.json({
          message: "user signout",
        });
      };


      //signin

      exports.post = (req, res) => {
        const errors = validationResult(req);
        const { email, password } = req.body;
        //email, password field validation
        if (!errors.isEmpty()) {
          return res.status(422).json({
            error: errors.array()[0].msg,
          });
        }
        //checking user details in database
        User.findOne({ email }, (err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: "email not found",
            });
          }
          if (!user.autheticate(password)) {
            return res.status(401).json({
              error: "invalid password",
            });
          }
          //creating token
          const token = jwt.sign({ _id: user._id }, process.env.SECRET);
          //putting the token into the cookie
          res.cookie("COOKIE", token, { expire: new Date() + 9999 });
          //send responce to front end
          const { _id, name, email, role } = user;
          res.json({ token, user: { _id, name, email, role } });
        });
      };

      //PROTECTED ROUTES
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
  });
  
  //CUSTOM MIDDLEWARE
  exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.auth._id == req.profile._id;
    if (!checker) {
      return res.status(403).json({
        error: "ACCESS DENIED",
      });
    }
    next();
  };
  
  exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
      return res.status(403).json({
        error: "You are not Admin, ACCESS DENIED",
      });
    }
    next();
  };
