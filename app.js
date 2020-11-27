const http = require('http');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passportLocal')
const bodyParser = require('body-parser')
const cors = require('cors');
const router = express.Router();
const app = express();
app.use(session({
    secret: 'secret secretary',
    resave: true,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

const poolDao = require('./models/PoolDAO')

app.set('port', 3000 || process.env.PORT);
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())
// app.use('/', static(__dirname + '/public'));

router.post('/login/attempt', passport.authenticate('local', {
    failureRedirect: '/login',
    // failureMessage:false,
}), (req, res) => {
    console.log('authentication complete - success!')
    req.session.save(function () {
        console.log(req.session.passport)
        res.redirect('/');
    })
})

router.route('/pool/:id')
    .get((req, res) => {
        if (!req.query.searchWord) {
            poolDao.findDetailById(req.params.id, (err, result) => {
                if (err) res.status(500);
                res.json(result);
            })
        } else {
            poolDao.findList(req.query, (err, result) => {
                if (err) res.status(500);
                res.json(result);
            })
        }
    })
    .post((req, res) => {
    })
    .put((req, res) => {
    })
    .delete((req, res) => {
    })

router.route('/logout').get((req, res) => {
    req.logout();
    req.session.save(function () {
        res.redirect('/');
    })
})

app.use('/', router);
const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log('http://localhost:%d', app.get('port'));
});
