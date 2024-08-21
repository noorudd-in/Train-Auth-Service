const express = require("express");
const { PORT } = require("./config/constants");

const app = express();
const v1Routes = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
    res.status(200).json({name: 'Auth Service', status: 'up'})
})
app.use('/auth/api', v1Routes)

app.listen(PORT, () => {
    console.log(`Auth Service is up and running at port ${PORT}`)
});
