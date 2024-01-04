const handleError = require('../helpers/handle-error');

const checkHata = (req, res, next) => {
    if (req.hata) {
        return handleError(res, req.hata);
    }

    next();
};

module.exports = checkHata;
