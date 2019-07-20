const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
};

app.use(routes);

mongoose.connect(process.env.MONGODB_URL, { useCreateIndex: true, useNewUrlParser: true })

app.listen(PORT, function () {
    console.log(`Back end server on port ${PORT}`);
})