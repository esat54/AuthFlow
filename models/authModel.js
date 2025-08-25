const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.findUser = async (username, password) => {        // users find
    try {
        const result = await prisma.user.findFirst({
            where: {
                username: username,    
                password: password
            }
        });
        return result; 

    } catch (error) {
        console.error('Database error', error);
        return null;
    }
};




exports.createUser = async (username, password, role = 'USER') => {        // new user creation function
    try {
        const result = await prisma.user.create({
            data: {
                username: username,    
                password: password,
                role: role            // default 'USER'
            },
        });

    } catch (error) {
        console.error('Registration error', error);
        throw error;
    }
};


exports.getAllUsers = async () => {
    try {
        const result = await prisma.user.findMany();

    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
};





exports.deleteUser = async (userId) => {
    try {
        await prisma.user.delete({
            where: { id: userId }
        });
    } catch (error) {
        throw error;
    }
};