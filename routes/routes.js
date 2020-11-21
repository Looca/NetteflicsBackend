module.exports = (app) => {
    const usersModel = require('../controllers/user.controller');
    const connectEnsureLogin = require('connect-ensure-login');


    /** AUTENTICAZIONE **/
    app.post('/login', (req, res, next) => {
        passport.authenticate('local',
            (err, user, info) => {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.redirect('/login?info=' + info);
                }

                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }

                    return res.redirect('/');
                });

            })(req, res, next);
    });

    app.get('/login',
        (req, res) => res.json({ result: 'login' }),// res.sendFile('html/login.html',
        // { root: __dirname })
    );

    app.get('/',
        connectEnsureLogin.ensureLoggedIn(),
        (req, res) => res.json({ result: 'Sei loggato' }) // res.sendFile('html/index.html', {root: __dirname})
    );

    app.get('/private',
        connectEnsureLogin.ensureLoggedIn(),
        (req, res) => res.sendFile('html/private.html', { root: __dirname })
    );

    app.get('/user',
        connectEnsureLogin.ensureLoggedIn(),
        (req, res) => res.send({ user: req.user })
    );

    /*

   // Create a new User
   app.post('/users', usersModel.create);*/

    // Retrieve all Users
    // app.get('/users', connectEnsureLogin.ensureLoggedIn(), usersModel.findAll);

    /*// Retrieve a single User with userId
    app.get('/users/:userId', usersModel.findOne);

    // Update a User with userId
    app.put('/users/:userId', usersModel.update);

    // Delete a User with userId
    app.delete('/users/:userId', usersModel.delete);*/

    // USERS
    
    /*app.route('/users/:action?/:id?')
          .get(connectEnsureLogin.ensureLoggedIn(), usersModel.findAll) // VERIFICARE
          .post(connectEnsureLogin.ensureLoggedIn(), usersModel.execute)
          .put(connectEnsureLogin.ensureLoggedIn(), usersModel.execute);*/
}