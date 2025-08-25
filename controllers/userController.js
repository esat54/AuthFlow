const authModel = require('../models/authModel');
const productModel = require('../models/productModel');



exports.getUserDashboard = async (req, res) => {
    try {
        const products = await productModel.getProductsByUserId(req.session.userId);
        const categories = await productModel.getCategoriesByUserId(req.session.userId);

        res.render('userdashboard', { username: req.session.username, products: products, categories: categories });

    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).send('Server error.');
    }
};


exports.addProduct = async (req, res) => {
    try {
        const { name, description } = req.body;
        const price = parseFloat(req.body.price);
        const categoryId = parseInt(req.body.category, 10);
        const userId = req.session.userId;


        await productModel.addProduct(name, description, price, categoryId, userId);

        res.redirect('/userdashboard');

    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).send('Sunucu hatası.');
    }
};



exports.addCategory = async (req, res) => {
    try {
        const categoryName = req.body.categoryName;
        const userId = req.session.userId;

        await productModel.addCategory(categoryName, userId);
        res.redirect('/userdashboard');

    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).send('Server error');
    }
};


exports.deleteProduct = async (req, res) => {

    try {
        const productId = parseInt(req.body.productId);

        await productModel.deleteProduct(productId);
        res.redirect('/userdashboard');

    } catch (error) {
        console.log(error)
    }
}


exports.deleteCategory = async (req, res) => {
    try {

        const categoryId = parseInt(req.body.categoryId);

        await productModel.deleteCategory(categoryId);
        res.redirect('userdashboard');
        
    } catch (error) {
        console.log(error)
    }
}
