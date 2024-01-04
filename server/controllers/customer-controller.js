const handleError = require('../helpers/handle-error');
const CustomerService = require('../services/customer-service');

const CustomerController = {
    createCustomer: async (req, res) => {
        try {
            const response = await CustomerService.createCustomer(req.body);
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },

    getCustomer: async (req, res) => {
        try {
            const response = await CustomerService.getCustomer(req.query);
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },
};

module.exports = CustomerController;
