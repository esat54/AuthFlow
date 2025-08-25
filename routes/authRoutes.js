const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');


// Middleware for user authorization
const userAuth = (req, res, next) => {      
    if (req.session.username) {
        next(); 
    } else {
        res.redirect('/auth'); 
    }
};

// Middleware for admin authorization
const adminAuth = (req, res, next) => {         
    if (req.session.username && req.session.role === 'admin') {
        next(); 
    } else {
        res.redirect('/auth'); 
    }
};



router.get('/', authController.getHome);        // Home page route

router.get('/auth', authController.getAuth);        // Auth page route


router.post('/login', authController.postLogin);  // Handle login form submission
router.post('/register', authController.postRegister); // Handle registration form submission


router.get('/userdashboard', userAuth, userController.getUserDashboard); // User dashboard route
router.get('/admindashboard', adminAuth, adminController.getAdminDashboard); // Admin dashboard route


router.post('/add-product',  userController.addProduct);                // Route to add a new product
router.post('/add-category',  userController.addCategory);            // Route to add a new category

router.post('/delete-product',  userController.deleteProduct);        // Route to delete a product
router.post('/delete-category',  userController.deleteCategory);    // Route to delete a category

router.post('/delete-user', adminAuth, adminController.deleteUser); // Route to delete a user


router.get('/logout', authController.getLogout); // Logout route


module.exports = router;
