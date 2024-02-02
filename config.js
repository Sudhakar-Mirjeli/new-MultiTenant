require('dotenv').config();


const {
    JWT_SECRET, MONGO_URI, BASE_DB_URI, ADMIN_DB_NAME, PORT
} = process.env;

module.exports = {
    SERVER: {
        JWT_SECRET: JWT_SECRET,
        MONGO_URI: MONGO_URI,
        PORT: PORT


    },
    BASE_DB_URI: BASE_DB_URI,
    ADMIN_DB_NAME: ADMIN_DB_NAME
}