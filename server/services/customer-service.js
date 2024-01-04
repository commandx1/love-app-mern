const Customer = require('../models/customer_1');

require('dotenv').config();

const CustomerService = {
    createCustomer: async params => {
        const { db_name } = params;
        await Customer.create({ db_name });
        return { message: 'Uygulama başarıyla oluşturuldu ☺️' };
    },

    getCustomer: async params => {
        const { db_name } = params;
        const customerDb = await Customer.findOne({ db_name });

        if (!customerDb) {
            throw new Error('Bu isimde bir uygulama bulunamadı.');
        }

        return { customerDb };
    },
};

module.exports = CustomerService;
