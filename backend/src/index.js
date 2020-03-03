const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.set('useCreateIndex', true);
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://olhachei:olhachei@olhachei-roj3n.mongodb.net/olhachei?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3333);