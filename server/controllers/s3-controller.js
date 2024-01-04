const S3Service = require('../services/s3-service');

const S3Controller = {
    uploadImage: async (req, res) => {
        try {
            const response = await S3Service.uploadImage();
            res.json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteImage: (req, res) => {
        try {
            S3Service.deleteImage(req.params.s3Key, (err, data) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }

                res.json({ success: true });
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = S3Controller;
