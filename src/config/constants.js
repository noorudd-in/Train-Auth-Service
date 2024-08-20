require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_ID: process.env.EMAIL_ID,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_PORT: process.env.EMAIL_PORT,
    BASE_URL: process.env.BASE_URL
}