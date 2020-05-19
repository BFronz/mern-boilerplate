const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const bodyParser =  require('body-parser');
const cookieParser =  require('cookie-parser');
const { User } = require('./models/user');

const config = require('./config/key');

mongoose.connect(config.mongoURI, 
{ useNewUrlParser: true , useUnifiedTopology: true  } )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));



app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

// app.get('/', (req,res) => {res.send('hello world') });

app.post("/api/users/register", (req, res) => {
  var user = new User(req.body);
   
    user.save((err, doc) => {
      if(err) return res.json({success: false, err});
      res.status(200).json({
        success: true,
        userData: doc
      })
    })
 })

// app.post("/api/users/register", (req, res) => {
//   var myData = new User(req.body);
//     console.log(myData);


//     myData.save()
//       .then(item => {
//           res.send("item saved to database");
//         })
//       .catch(err => {
//           res.status(400).send("unable to save to database");
//        });
//  });


app.post('/api/usr/login', (req, res) =>{
  // find the email
  User.findOne({email: req.body.email}, (err, user) =>{
    if(user)
    return res.json({
      loginSuccess: false,
      message: "Auth failed, email not found"
    })

    // compare pw   
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) {
        return res.json ({ loginSuccess: false, message: "wrong password"})
      }
    })
    // generate token
    user.generateToken(( err, user) => {
      if(err) return res.status (400).send(err);
      res.cookie("x_auth", user.token)
        .status(200)
        .json({
          loginSuccess: true
        })
    })
  })

  


  
})
  


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
