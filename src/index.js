const express = require("express");
const { PORT } = require("./config/constants");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Auth Service is up and running at port ${PORT}`)
});
