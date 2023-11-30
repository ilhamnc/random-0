require('dotenv').config();

module.exports = {
    development: {
        username: 'root',
        password: 'authentic1009',
        database: 'user-db',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
};