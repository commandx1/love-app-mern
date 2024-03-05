const handleError = require('../helpers/handle-error');
const PlaceService = require('../services/place-service');

const PlaceController = {
    getPlaces: async (req, res) => {
        try {
            const response = await PlaceService.getPlaces();
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },
    updatePlaces: async (req, res) => {
        try {
            const response = await PlaceService.updatePlaces(req.body);
            res.json(response);
        } catch (error) {
            handleError(res, error);
        }
    },
};

module.exports = PlaceController;
