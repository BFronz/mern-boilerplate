const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const bodyParser =  require('body-parser');
const cookieParser =  require('cookie-parser');
const { User } = require('./models/user');
const { auth } = require("./middleware/auth")



const config = require('./config/key');

mongoose.connect(config.mongoURI, 
{ useNewUrlParser: true , useUnifiedTopology: true  } )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));



app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

// app.get('/', (req,res) => {res.send('hello world') });


app.get("/api/usr/auth", auth, (req,res) => {
  res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role
    });
})

app.post("/api/users/register",  (req, res) => {
  var user = new User(req.body);
   
    user.save((err, doc) => {
      if(err) return res.json({success: false, err});
      res.status(200).json({
        success: true,
        userData: doc
      })
    })
 })




app.post('/api/usr/login', (req, res) =>{

  // find user
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
        return res.json({
            loginSuccess: false,
            message: "Auth failed, account not found"
        });

     // compare PW   
    user.comparePassword(req.body.password, (err, isMatch) => {
      // console.log(isMatch);
        if (!isMatch)
            return res.json({ loginSuccess: false, message: "Wrong password" });


        // generate token    
        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            res
               .cookie("x_auth", user.token)
                .status(200)
                .json({
                  loginSuccess: true
            });
        });
    });
});
})


app.get("/api/usr/logout", auth, (req, res) => {

  User.findOneAndUpdate( {_id :req.user._id}, {token: ""}, (err, doc) => {
    if(err)  return res.json({success: false, err})
    return res.status(200).send({
      sucess: true
    }) 
  })

})

  


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
