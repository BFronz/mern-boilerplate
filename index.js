const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;


app.get('/', (req,res) => {
   res.send('hello world') 
});

app.post('/',  (req, res)  => {
    res.send('POST request to the homepage')
  })



mongoose.Promise = Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/boilermern",
  { useNewUrlParser: true, useUnifiedTopology: true  }  
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));



app.listen(5000);