const Memory = require('../models/memory');
const S3Service = require('./s3-service');

const validateParams = params => {
    const { content, title, date } = params;

    if (!title) {
        throw new Error('Lütfen başlık giriniz.');
    }

    if (!content) {
        throw new Error('Anı içeriği boş olamaz.');
    }

    if (!date) {
        throw new Error('Lütfen tarih giriniz.');
    }
};

const CeyizService = {
    getMemories: async () => {
        const items = await Memory.find({}).sort({ created_date: -1 });
        return items;
    },

    createMemory: async params => {
        const { content, title, files, user, date } = params;

        validateParams(params);

        let s3_paths = [];

        if (files?.length) {
            s3_paths = await Promise.all(files.map(file => S3Service.uploadImage(file)));
        }

        const newMemory = await Memory.create({
            content,
            user,
            date: new Date(date),
            title,
            s3_paths,
            created_date: new Date(),
        });

        /* const accountSid = 'ACdd049dc811efc17e04ae582583117d72';
        const authToken = '7d2ba0722920570d2b4e49be3010f0ff';
        const client = require('twilio')(accountSid, authToken);

        const smsResponse = await client.messages.create({
            body: 'Birimiz anı, ceyiz vs yazdığında diğerimize whatsapp üzerinden haber yollamak için bir entegrasyon deniyorum aşkım :) Bu mesaj onun için...',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+905344200038',
        });
        */
        return {
            message: 'Anı başarıyla kaydedildi.',
            item: newMemory._doc,
        };
    },

    updateMemory: async params => {
        const { content, title, files, isDeleted, date, memory_id } = params;
        let { s3Keys } = params;
        s3Keys = s3Keys.split(',').filter(Boolean);

        validateParams(params);

        let s3_paths = [];

        if (files?.length) {
            if (s3Keys?.length) {
                await S3Service.deleteImages(s3Keys);
            }
            s3_paths = await Promise.all(files.map(file => S3Service.uploadImage(file)));
        }

        const body = { title, content, date: new Date(date) };

        if (isDeleted === 'true') {
            if (s3Keys?.length) {
                await S3Service.deleteImages(s3Keys);
            }
            body.s3_paths = [];
        }

        if (s3_paths) {
            body.s3_paths = s3_paths;
        }

        const updatedItem = await Memory.findByIdAndUpdate(
            memory_id,
            {
                $set: body,
            },
            { new: true }
        );

        return {
            message: 'Anı başarıyla kaydedildi.',
            updatedItem,
        };
    },

    deleteMemory: async params => {
        const { memory_id } = params;

        const item = await Memory.findById(memory_id);

        if (!item) {
            throw new Error('Anı bulunamadı.');
        }

        const s3Keys = item.s3_paths;
        await Memory.findByIdAndDelete(memory_id);

        if (s3Keys?.length) {
            try {
                await S3Service.deleteImages(s3Keys);
            } catch (error) {
                throw new Error('Resim silinirken bir hata meydana geldi.');
            }
        }

        return {
            message: 'Anı silindi 👍🏻',
        };
    },
};

module.exports = CeyizService;
