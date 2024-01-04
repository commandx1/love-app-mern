const handleError = require('../helpers/handle-error');
const UserService = require('../services/user-service');

const UserController = {
    createUser: async (req, res) => {
        try {
            const response = await UserService.createUser(req.body);
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },
    loginUser: async (req, res) => {
        try {
            const response = await UserService.loginUser(req.body);
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },
};

module.exports = UserController;
