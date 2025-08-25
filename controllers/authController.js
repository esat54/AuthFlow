const authModel = require('../models/authModel');


exports.getHome = (req, res) => {                   //homepage
    res.render('home')
};

exports.getAuth = (req, res) => {
    res.render('auth');
};



exports.postLogin = async (req, res) => {       //post Login
    const username = req.body.loginusername;
    const password = req.body.loginpassword;
    console.log(`Giriş denemesi ->Username '${username}', Şifre: '${password}'`);

    const user = await authModel.findUser(username, password);


    if (user) {    //there is a user
        req.session.username = user.username;
        req.session.role = user.role; 
        req.session.userId = user.id; 

        // Check the value in the session
        if (req.session.role === "admin") {
            res.redirect('/admindashboard')
        }
        else {
            res.redirect('/userdashboard');
        }

    } else {
        res.render('auth', { error: 'Username or password wrong' });
    }
};


exports.postRegister = async (req, res) => {        //post Register
    const username = req.body.registerusername;
    const password = req.body.registerpassword;

    try {
        await authModel.createUser(username, password);
        res.render('auth', { message: 'Registration successful! You can now log in.' });

    } catch (error) {
        console.error('Registration error:', error);
        res.render('auth', { message: 'Registration failed! Username already exists.' });
    }
};



exports.getLogout = (req, res) => {                 //logout
    req.session.destroy(err => {

        if (err) {
            console.error('Session termination error:', err);
            return res.status(500).send('Logout failed.');
        }

        res.redirect('/auth');
    });
};