const authModel = require('../models/authModel');


exports.getAdminDashboard = async (req, res) => {
    try {
        const allUsers = await authModel.getAllUsers();
        res.render('admindashboard', { username: req.session.username, users: allUsers });
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).send('Server error');
    }
};


exports.deleteUser = async (req, res) => {             
    try {
        const userId = req.body.userId;

        await authModel.deleteUser(userId);

        res.redirect('/admindashboard');

    } catch (error) {
        console.error('Error deleting user:', error);
    }
}