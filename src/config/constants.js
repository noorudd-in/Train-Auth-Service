require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY
}