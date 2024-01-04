const dotenv = require('dotenv');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const S3Service = {
    getS3Object: () => {
        AWS.config.update({
            accessKeyId: process.env.s3_access_key,
            secretAccessKey: process.env.s3_secret_access_key,
            region: process.env.s3_region,
        });

        return new AWS.S3();
    },

    uploadImage: file =>
        new Promise((resolve, reject) => {
            let myFile = file.originalname.split('.');
            const fileType = myFile[myFile.length - 1];

            const params = {
                Bucket: process.env.s3_bucket_name,
                Key: `${uuidv4()}.${fileType}`,
                Body: file.buffer,
            };

            const s3 = S3Service.getS3Object();

            s3.upload(params, async (error, data) => {
                if (error) {
                    return reject(error);
                }

                try {
                    return resolve(data.Key);
                } catch (error) {
                    return reject(error);
                }
            });
        }),

    deleteImages: s3Keys =>
        new Promise((resolve, reject) => {
            const s3 = S3Service.getS3Object();
            s3.deleteObjects(
                {
                    Bucket: process.env.s3_bucket_name,
                    Delete: {
                        Objects: s3Keys.map(Key => ({ Key })),
                        Quiet: false, // Eğer true ise, hata olursa sessizce devam eder
                    },
                },
                err => {
                    if (err) {
                        return reject(err);
                    }

                    resolve({ success: true });
                }
            );
        }),
};

module.exports = S3Service;
