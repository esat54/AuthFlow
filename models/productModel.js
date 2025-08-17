const dbBaglantisi = require('../db/connection'); 

exports.getProductsByUserId = async (userId) => {
    try {
        const result = await dbBaglantisi.query("SELECT * FROM products WHERE user_id = $1", [userId]);
        return result.rows; 

    } catch (error) {
        console.error('Error getting products:', error);
        throw error; 
    }
};

exports.addProduct = async (name, description, price, userId) => {      
    try {
        await dbBaglantisi.query("INSERT INTO products (name, description, price, user_id) VALUES ($1, $2, $3, $4)", [name, description, price, userId]);

    } catch (error) {
        throw error;
    }
};
