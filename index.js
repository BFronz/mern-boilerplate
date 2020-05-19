const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const bodyParser =  require('body-parser');
const cookieParser =  require('cookie-parser');
const { User } = require('./models/user');

mongoose.connect('mongodb+srv://dbMernUser:Mern2020@mern-boilerplate-gd7xv.mongodb.net/test?retryWrites=true&w=majority', 
{ useNewUrlParser: true } )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));



app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());



// app.get('/', (req,res) => {
//    res.send('hello world') 
// });

app.post('/api/users/register',  (req, res)  => {
      const user =  new User(req.body);
     
      user.save( (err, userData) => {
        if(err) return res.json({sucess: false})

      });
      return res.status(200)
  })

  



// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
