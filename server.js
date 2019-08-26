const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/items');
const path = require('path');
const app = express();

// BOdy Parser MiddleWare
app.use(bodyParser.json());
// config DB
const db = require('./config/key').mongoURI;

// connect to mongoDB
mongoose
.connect(db, {useNewUrlParser:true})
.then(() => console.log('MongoDB COnnected'))
.catch(err => console.log(err));

app.use('/api/items', items)

app.use(express.static('client/build'));
app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`server started on port ${port}`))