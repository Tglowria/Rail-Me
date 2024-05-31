const User = require('../models/user.models');

exports.isAdmin = async (req, res, next) => {
    try {
        
        const UserId = req.body;

        const user = await User.findById(UserId);
        
        if (user && isAdmin === 'false') {
            next();
       
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};