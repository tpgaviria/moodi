const express = require('express');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
// const session = require('express-session');
// const passport = require('passport');
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
};

app.use(routes);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
});

app.listen(PORT, function () {
    console.log(`Back end server on port ${PORT}`);
})