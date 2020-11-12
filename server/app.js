const express = require('express');
const app = express();
const morgan = require('morgan');
const router = require('./routes');
//const bodyParser = require('body-parser');
//const session = require('express-session')
//const flash = require('connect-flash');
const expressSanitizer = require('express-sanitizer');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the views directory to be ./views, thereby letting the app know where to find the template files
app.set('views', './views');

// Set the default engine to be ejs.
// Note we don't need to require it, express will do that for us
app.set('view engine', 'ejs');

// Now instead of using res.send we can use res.render to send the output of the template by filename (* moved to routes.js)
// app.get('/', (req, res) => {
//     res.render('index');
// });

app.use(express.static('public'));
//app.use(flash());
app.use(expressSanitizer());

app.use('/', router);

module.exports = app;


