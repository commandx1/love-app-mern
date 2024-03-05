const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const UserRoutes = require('./routes/user-routes');
const S3Routes = require('./routes/s3-routes');
const GalleryRoutes = require('./routes/gallery-routes');
const CeyizRoutes = require('./routes/ceyiz-routes');
const CustomerRoutes = require('./routes/customer-routes');
const MemoryRoutes = require('./routes/memory-routes');
const PoemRoutes = require('./routes/poem-routes');
const PlaceRoutes = require('./routes/place-routes');

const app = express();
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');

    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let mongoString;

app.use((req, res, next) => {
    try {
        let { customerDb, db_name } = req.query;

        if (!customerDb && !db_name) {
            throw new Error('Uygulama ismi bulunamadı.');
        }

        if (db_name) {
            customerDb = db_name;
        }

        mongoString = `mongodb+srv://${process.env.dbUser}:${process.env.dbPassword}@${process.env.clusterName}.r5ftb24.mongodb.net/${customerDb}?retryWrites=true&w=majority`;
        next();
    } catch (error) {
        req.hata = error;
        next();
    }
});

app.use((req, res, next) => {
    mongoose
        .connect(mongoString, {
            useNewUrlParser: true,
        })
        .then(() => {
            console.log('MongoDB Bağlantısı Başarılı');
            next();
        })
        .catch(err => {
            console.error('MongoDB Bağlantı Hatası:', err);
            req.hata = err;
            next();
        });
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB bağlantı hatası:'));
db.once('open', function () {
    console.log('MongoDB bağlantısı başarıyla kuruldu');
});

app.use('/api/user', UserRoutes);
app.use('/api/image', S3Routes);
app.use('/api/gallery', GalleryRoutes);
app.use('/api/ceyiz', CeyizRoutes);
app.use('/api/memory', MemoryRoutes);
app.use('/api/poem', PoemRoutes);
app.use('/api/place', PlaceRoutes);
app.use('/api/customer', CustomerRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Uygulama http://localhost:${port} adresinde çalışıyor`);
});
