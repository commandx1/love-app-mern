const jwt = require('jsonwebtoken');
const User = require('../models/user');
const handleError = require('../helpers/handle-error');

const protect = async (req, res, next) => {
    try {
        let token;
        return next();

        // return and ignore for now
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                // Get token from header
                token = req.headers.authorization.split(' ')[1];

                // Verify token
                const decoded = jwt.verify(token, process.env.jwt_secret);

                // Get user from the token
                req.user = await User.findById(decoded.id).select('-password');

                next();
            } catch (error) {
                throw new Error('Oturumunuzun süresi doldu. Yeniden giriş yapınız.');
            }
        }

        if (!token) {
            throw new Error('Token bulunamadı.');
        }
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = { protect };
