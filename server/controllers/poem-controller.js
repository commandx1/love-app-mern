const handleError = require('../helpers/handle-error');
const PoemService = require('../services/poem-service');

const CeyizController = {
    getPoems: async (req, res) => {
        try {
            const response = await PoemService.getPoems();
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },

    createPoem: async (req, res) => {
        try {
            const response = await PoemService.createPoem(req.body);
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },

    updatePoem: async (req, res) => {
        try {
            const { body, params } = req;
            const response = await PoemService.updatePoem({ ...body, ...params });
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },

    deletePoem: async (req, res) => {
        try {
            const response = await PoemService.deletePoem(req.params);
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },
};

module.exports = CeyizController;
