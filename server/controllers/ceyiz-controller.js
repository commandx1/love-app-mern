const handleError = require('../helpers/handle-error');
const CeyizService = require('../services/ceyiz-service');

const CeyizController = {
    getItems: async (req, res) => {
        try {
            const response = await CeyizService.getItems(req.query.category_id);
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },

    getFavourites: async (req, res) => {
        try {
            const response = await CeyizService.getFavourites();
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },

    createItem: async (req, res) => {
        try {
            const { files, body } = req;
            const response = await CeyizService.createItem({ ...body, files });
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },

    updateItem: async (req, res) => {
        try {
            const { files, body, params } = req;
            const response = await CeyizService.updateItem({ ...body, ...params, files });
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },

    updateStatus: async (req, res) => {
        try {
            const response = await CeyizService.updateStatus({ ...req.body, ...req.params });
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },

    deleteItem: async (req, res) => {
        try {
            const response = await CeyizService.deleteItem(req.params);
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },
};

module.exports = CeyizController;
