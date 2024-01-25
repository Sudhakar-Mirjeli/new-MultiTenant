require('dotenv').config();


const {
    JWT_SECRET, MONGO_URI, BASE_DB_URI, ADMIN_DB_NAME, JWT_SECRET_KEY, PORT
} = process.env;

module.exports = {
    SERVER: {
        JWT_SECRET: JWT_SECRET,
        MONGO_URI: MONGO_URI,
        JWT_SECRET_KEY: JWT_SECRET_KEY,
        PORT: PORT


    },
    BASE_DB_URI: BASE_DB_URI,
    ADMIN_DB_NAME: ADMIN_DB_NAME
}