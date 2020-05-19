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
  var myData = new User(req.body);
  console.log(myData);
    myData.save()
      .then(item => {
          res.send("item saved to database");
        })
      .catch(err => {
          res.status(400).send("unable to save to database");
       });
 });



  


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
