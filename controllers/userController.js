const authModel = require('../models/authModel');
const productModel = require('../models/productModel');



exports.getUserDashboard = async (req, res) => {
    if (req.session.username) {

        try {
            const products = await productModel.getProductsByUserId(req.session.userId);

            res.render('userdashboard', { username: req.session.username, products: products });

        } catch (error) {
            console.error('Error getting products:', error);
            res.status(500).send('Server error.');
        }

    } else {
        res.redirect('/login');
    }
};


exports.addProduct = async (req, res) => {
    try {
        // Get the data from the form
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;

        // Call the model and send the data
        await productModel.addProduct(name, description, price, req.session.userId);

        res.render('userdashboard', {
            username: req.session.username,
            products: await productModel.getProductsByUserId(req.session.userId), // Get the product list again
            message: 'Product added successfully!'
        });

    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).send('Server error');
    }
};
