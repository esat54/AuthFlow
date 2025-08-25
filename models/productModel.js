const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.getProductsByUserId = async (userId) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                category: {
                    userId: userId
                }
            },
            include: {
                category: true // Bu satır, her ürünle birlikte ilişkili kategori verisini de getirir.
            }
        });
        return products;
    } catch (error) {
        console.error('Error getting products:', error);
        throw error;
    }
};


exports.getCategoriesByUserId = async (userId) => {
    try {
        const categories = await prisma.category.findMany({
            where: {
                userId: userId
            }
        });
        return categories;
    } catch (error) {
        console.error('Error getting categories:', error);
        throw error;
    }
};


exports.addProduct = async (name, description, price, categoryId, userId) => {
    try {
        await prisma.product.create({
            data: {
                name,
                description,
                price,
                categoryId
            }
        });
    } catch (error) {
        console.error('Prisma Hatası:', error);
        throw error;
    }
};

exports.addCategory = async (name, userId) => {
    try {
        const category = await prisma.category.create({
            data: {
                name,
                userId
            },
        });
        return category;

    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
}


exports.deleteProduct = async (productId) => {
    try {
        await prisma.product.delete({
            where: { id: productId }
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

exports.deleteCategory = async (categoryId) => {
    try {
        await prisma.category.delete({
            where: {
                id: categoryId,
            },
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
}


