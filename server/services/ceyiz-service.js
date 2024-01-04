const CeyizItem = require('../models/ceyiz-item');
const S3Service = require('./s3-service');

const generateNumber = () => Math.floor(Math.random() * 128);
const generateColor = () => `rgb(${generateNumber()}, ${generateNumber()}, ${generateNumber()})`;

const CeyizService = {
    getItems: async category_id => {
        const items = await CeyizItem.find({ category_id }).sort({ created_date: -1 });
        return items;
    },

    getFavourites: async () => {
        const items = await CeyizItem.find({ is_favourite: true }).sort({ created_date: -1 });
        return items;
    },

    createItem: async params => {
        const { description, more_description, title, category_id, files } = params;

        if (!title) {
            throw new Error('Lütfen çeyiz ismi giriniz.');
        }

        if (!category_id) {
            throw new Error('Kategori bulunamadı.');
        }

        let s3_paths = [];

        if (files?.length) {
            s3_paths = await Promise.all(files.map(file => S3Service.uploadImage(file)));
        }

        const newItem = await CeyizItem.create({
            category_id,
            description,
            more_description,
            title,
            s3_paths,
            is_favourite: false,
            created_date: new Date(),
            color: generateColor(),
        });

        return {
            message: 'Eşya başarıyla kaydedildi.',
            item: newItem._doc,
        };
    },

    updateItem: async params => {
        const { description, more_description, title, files, isDeleted, ceyiz_item_id } = params;
        let { s3Keys } = params;
        s3Keys = s3Keys.split(',').filter(Boolean);

        if (!title) {
            throw new Error('Lütfen çeyiz ismi giriniz.');
        }

        let s3_paths = [];

        if (files?.length) {
            if (s3Keys?.length) {
                await S3Service.deleteImages(s3Keys);
            }
            s3_paths = await Promise.all(files.map(file => S3Service.uploadImage(file)));
        }

        const body = { title, description, more_description };

        if (isDeleted === 'true') {
            if (s3Keys?.length) {
                await S3Service.deleteImages(s3Keys);
            }
            body.s3_paths = [];
        }

        if (s3_paths) {
            body.s3_paths = s3_paths;
        }

        const updatedItem = await CeyizItem.findByIdAndUpdate(
            ceyiz_item_id,
            {
                $set: body,
            },
            { new: true }
        );

        return {
            message: 'Eşya başarıyla kaydedildi.',
            updatedItem,
        };
    },

    updateStatus: async params => {
        const { bool, ceyiz_item_id } = params;

        if (!ceyiz_item_id) {
            throw new Error("Bu ID'ye sahip bir çeyiz bulunamadı.");
        }

        await CeyizItem.findByIdAndUpdate(ceyiz_item_id, { $set: { is_favourite: bool } });
        return { message: bool ? 'Eşya favorilere eklendi.' : 'Eşya favorilerden çıkarıldı.' };
    },

    deleteItem: async params => {
        const { ceyiz_item_id } = params;

        const item = await CeyizItem.findById(ceyiz_item_id);

        if (!item) {
            throw new Error('Eşya bulunamadı.');
        }

        const s3Keys = item.s3_paths;
        await CeyizItem.findByIdAndDelete(ceyiz_item_id);

        if (s3Keys?.length) {
            try {
                await S3Service.deleteImages(s3Keys);
            } catch (error) {
                throw new Error('Resim silinirken bir hata meydana geldi.');
            }
        }

        return {
            message: 'Eşya silindi 👍🏻',
        };
    },
};

module.exports = CeyizService;
