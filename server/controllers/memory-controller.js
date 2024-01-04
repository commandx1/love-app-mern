const handleError = require('../helpers/handle-error');
const MemoryService = require('../services/memory-service');

const CeyizController = {
    getMemories: async (req, res) => {
        try {
            const response = await MemoryService.getMemories();
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },

    createMemory: async (req, res) => {
        try {
            const { files, body } = req;
            const response = await MemoryService.createMemory({ ...body, files });
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },

    updateMemory: async (req, res) => {
        try {
            const { files, body, params } = req;
            const response = await MemoryService.updateMemory({ ...body, ...params, files });
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },

    deleteMemory: async (req, res) => {
        try {
            const response = await MemoryService.deleteMemory(req.params);
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },
};

module.exports = CeyizController;
