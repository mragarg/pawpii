require('dotenv').config();
const express = require('express');
const es6Renderer = require('express-es6-template-engine');

// Routers
const userRouter = require('./routes/user');

const app = express();
const PORT = process.env.PORT;

// Helmet
const helmet = require('helmet');
app.use(helmet());

// For PORT. Configures express to use built-in middleware that 
// can deal with form data.
app.use(express.urlencoded({extended: true}));

// ES6
app.engine('html', es6Renderer);
app.set('view engine', 'html');
app.set('views', 'views');

// GET Home
app.get('/', (req, res) => {
    res.render('index');
});

// USER Router
app.use('/user', userRouter);

// App Listen
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}.`)
});