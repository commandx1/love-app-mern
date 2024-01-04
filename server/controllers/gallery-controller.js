const GalleryController = {
    getImages: async (req, res) => {
        try {
            res.json({});
        } catch (error) {
            handleError(res, error);
        }
    },

    createImage: async (req, res) => {
        res.send(req.body);
    },
};

module.exports = GalleryController;
