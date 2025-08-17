const authModel = require('../models/authModel');



exports.getHome = (req, res) => {                   //homepage
    res.render('home')
}



exports.getLogin = (req, res) => {                  //get Login
    res.render('login', { error: null });   
};

exports.postLogin = async (req, res) => {       //post Login
    const username = req.body.username;
    const password = req.body.password;
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
        res.render('login', { error: 'Username or password wrong' });
    }
};



exports.getRegister = (req, res) => {                    //get Register
    res.render('register');
};

exports.postRegister = async (req, res) => {        //post Register
    const username = req.body.username;
    const password = req.body.password;

    try {
        await authModel.createUser(username, password);
        res.render('register', { message: 'Registration successful! You can now log in.' });

    } catch (error) {
        console.error('Registration error:', error);
        res.render('register', { message: 'Registration failed! Username already exists.' });
    }
};



exports.getLogout = (req, res) => {                 //logout
    req.session.destroy(err => {

        if (err) {
            console.error('Session termination error:', err);
            return res.status(500).send('Logout failed.');
        }

        res.redirect('/login');
    });
};