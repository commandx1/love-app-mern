const Poem = require('../models/poem');
const S3Service = require('./s3-service');

const validateParams = params => {
    const { content, title } = params;

    if (!title) {
        throw new Error('Lütfen başlık giriniz.');
    }

    if (!content) {
        throw new Error('Şiir içeriği boş olamaz.');
    }
};

const CeyizService = {
    getPoems: async () => {
        const items = await Poem.find({}).sort({ created_date: -1 });
        return items;
    },

    createPoem: async params => {
        const { content, title, user } = params;

        validateParams(params);

        const newPoem = await Poem.create({
            content,
            user,
            title,
            created_date: new Date(),
        });

        return {
            message: 'Şiir başarıyla kaydedildi.',
            item: newPoem._doc,
        };
    },

    updatePoem: async params => {
        const { content, title, poem_id } = params;

        validateParams(params);

        const body = { title, content };

        const updatedItem = await Poem.findByIdAndUpdate(
            poem_id,
            {
                $set: body,
            },
            { new: true }
        );

        return {
            message: 'Şiir başarıyla kaydedildi.',
            updatedItem,
        };
    },

    deletePoem: async params => {
        const { poem_id } = params;

        const item = await Poem.findById(poem_id);

        if (!item) {
            throw new Error('Şiir bulunamadı.');
        }

        await Poem.findByIdAndDelete(poem_id);

        return {
            message: 'Şiir silindi 👍🏻',
        };
    },
};

module.exports = CeyizService;
