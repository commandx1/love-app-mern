const Place = require('../models/place');

const PlaceService = {
    getPlaces: async () => {
        const places = await Place.find({});
        return { places: places?.[0]?.names || [] };
    },
    updatePlaces: async params => {
        const { names } = params;

        if (!names) {
            throw new Error('Lütfen şehir ya da ülke seçiniz.');
        }

        await Place.findOneAndUpdate({}, { $set: { names } }, { upsert: true });

        return {
            message: 'Seyahatleriniz başarıyla kaydedildi.',
        };
    },
};

module.exports = PlaceService;
