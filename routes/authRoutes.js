const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');


 
const userAuth = (req, res, next) => {      //user control
    if (req.session.username) {
        next(); 
    } else {
        res.redirect('/login'); 
    }
};

const adminAuth = (req, res, next) => {         //admin control
    if (req.session.username && req.session.role === 'admin') {
        next(); 
    } else {
        res.redirect('/login'); 
    }
};


router.get('/', authController.getHome);        //Homepage


router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);


router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);


router.get('/userdashboard', userAuth, userController.getUserDashboard);
router.get('/admindashboard', adminAuth, adminController.getAdminDashboard);


router.post('/add-product',  userController.addProduct);     


router.get('/logout', authController.getLogout);

module.exports = router;
