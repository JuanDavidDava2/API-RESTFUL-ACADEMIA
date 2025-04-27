require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'academia',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    dialectModule: require('mysql2'),
  },
};