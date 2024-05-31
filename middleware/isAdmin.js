const User = require('../models/user.models');

exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user && user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
