const dbBaglantisi = require('../db/connection'); 


exports.findUser = async (username, password) => {              // users find
    try {
        const result = await dbBaglantisi.query(
            'SELECT * FROM users WHERE username = $1 AND password = $2',
            [username, password]
        );

        return result.rows[0];  //get the first and only result

    } catch (err) {
        console.error('Database connection error or query error', err);
        return null;
    }
};


exports.createUser = async (username, password) => {        // new user creation function
    try {
        const result = await dbBaglantisi.query(
            'INSERT INTO users (username, password) VALUES ($1, $2)',
            [username, password]
        );
        return result;

    } catch (error) {
        console.error('Registration error', error);
        throw error; 
    }
};


exports.getAllUsers = async () => {             
    try {
        const result = await dbBaglantisi.query("SELECT * FROM users");
        return result.rows; // Returns the user data
        
    } catch (error) {
        console.error('Error getting users:', error);
        throw error; 
    }
};

