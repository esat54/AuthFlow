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