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

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1256813",
  key: "d68418bc79c3238fc99d",
  secret: "af162ce19b3b669db504",
  cluster: "ap1",
  useTLS: true
});

//dummy data

let Todo = [];

//routes
app.get('/', (req, res) => {
    console.log(Todo)
    res.render('index', { title: 'Home', Todo })
})

app.post('/', (req, res) => {
    console.log(req.body);
    Todo.push(req.body)
    pusher.trigger("todoList", "newList", req.body );
    
    res.json({ msg: 'success' });
})