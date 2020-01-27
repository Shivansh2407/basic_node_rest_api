const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express();

//app.use(bodyParser.urlencoded());
app.use(bodyParser.json()); //application/json

app.use((req, res,  next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET','OPTIONS','POST','PUT','PATCH','DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

mongoose.connect(
    'mongodb+srv://Octrix:Octrix@cluster0-5p2x1.gcp.mongodb.net/test?retryWrites=true&w=majority'
).then(result => {
    app.listen(8001);
})
.catch(err => console.log(err));
app.listen(8000);