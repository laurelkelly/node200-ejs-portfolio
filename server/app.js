const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the views directory to be ./views, thereby letting the app know where to find the template files
app.set('views', './views');

// Set the default engine to be ejs.
// Note we don't need to require it, express will do that for us
app.set('view engine', 'ejs');

// Now instead of using res.send we can use res.render to send the output of the template by filename (* moved to routes.js)
// app.get('/', (req, res) => {
//     res.render('index');
// });

app.use(express.static(__dirname + '/public'));
app.use('/', router);

module.exports = app;


