const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const { PORT } = process.env;

const app = express();

//connect database & app start
// mongoose.connect(dburi, { 
//     useUnifiedTopology:true, 
//     useNewUrlParser:true, 
//     useFindAndModify:false 
// }, () => {
//     app.listen(port, () => console.log(``) )
// })
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));

//view engine
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended:true }))

//routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
})

app.post('/', (req, res) => {
    let new_data = req.body;
    res.json(new_data)
    console.log(req.body);
    // res.render('index', { title: 'Home' })
})