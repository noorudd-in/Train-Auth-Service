const express = require("express");
const { PORT } = require("./config/constants");
const transporter = require('./config/mailer')
const { EMAIL_HOST, EMAIL_ID, EMAIL_PASS, EMAIL_PORT} = require('./config/constants')

const app = express();
const v1Routes = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', v1Routes)

app.listen(PORT, () => {
    console.log(`Auth Service is up and running at port ${PORT}`)
});
