const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const checkUsernamePassword = ({ username, password, full_name }) => {
    if (!username) {
        throw new Error('Lütfen kullanıcı adı giriniz.');
    }

    if (!password) {
        throw new Error('Lütfen şifrenizi giriniz.');
    }
};

const UserService = {
    createUser: async params => {
        const { username, password, full_name } = params;

        checkUsernamePassword(params);

        if (!full_name) {
            throw new Error('Lütfen isminizi giriniz.');
        }

        const isExists = await User.exists({ username });

        if (isExists) {
            throw new Error('Bu kullanıcı adı zaten kullanılıyor. Lütfen başka bir kullanıcı adı deneyiniz.');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ username, password: hashedPassword, full_name });

        if (user) {
            return {
                message: 'Kullanıcı başarıyla oluşturuldu 👍🏻',
                user: {
                    username: user.username,
                    full_name: user.full_name,
                    token: UserService.generateToken(user._id),
                },
            };
        }

        throw new Error('Geçersiz kullanıcı girişi 😕');
    },

    loginUser: async params => {
        const { username, password } = params;

        checkUsernamePassword(params);

        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            return {
                message: 'Uygulamamıza hoşgeldin aşkımm 🥰',
                user: {
                    username: user.username,
                    full_name: user.full_name,
                    image_path: user.image_path,
                    token: UserService.generateToken(user._id),
                },
            };
        }

        throw new Error('Hatalı giriş 😕');
    },

    generateToken: id =>
        jwt.sign({ id }, process.env.jwt_secret, {
            expiresIn: '1M',
        }),
};

module.exports = UserService;
