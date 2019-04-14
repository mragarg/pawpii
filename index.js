require('dotenv').config();
const express = require('express');
const es6Renderer = require('express-es6-template-engine');

// Routers
const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const dogRouter = require('./routes/dog');
const favoriteRouter = require('./routes/favorite');
const loginRouter = require('./routes/login');
const aboutRouter = require('./routes/about');
const organizationRouter  =require('./routes/organization');
const signupRouter = require('./routes/signup');
const stateRouter = require('./routes/state');

const app = express();
const PORT = process.env.PORT;

// Helmet
const helmet = require('helmet');
app.use(helmet());

// Session / FileStore
const session = require('express-session');
const FileStore = require(`session-file-store`)(session);
app.use(session({
    store: new FileStore(),
    secret: process.env.SESSION_SECRET
}));

// Auth
// setupAuth(app);

// For PORT. Configures express to use built-in middleware that 
// can deal with form data.
app.use(express.urlencoded({extended: true}));

// ES6
app.engine('html', es6Renderer);
app.set('view engine', 'html');
app.set('views', 'views');


// LOGOUT
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
})

// HOME Router
app.use('/', homeRouter);

// ABOUT Router
app.use('/about',aboutRouter);

// USER Router
app.use('/user', userRouter);

// DOG Router
app.use('/dogs', dogRouter);

// FAVORITE Router
app.use('/favorites', favoriteRouter);

// LOGIN Router
app.use('/login', loginRouter);

// SIGNUP Router
app.use('/signup', signupRouter);

//Orgs-Dog Router
app.use('/organization', organizationRouter);

//Org-State Router
app.use('/state', stateRouter);
// App Listen
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}.`)
});