require("dotenv").config();
const express = require("express");
const models = require("./models/index");
const sequelize = require("./database/index");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./endpointRoutes/index");
const errorHandler = require("./middleware/errorHandler/index");
const path = require("path");

const PORT = process.env.PORT || 7000;
const app = express();
const http = require("http");

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "assets")));
app.use(fileUpload({}));
app.use("/api/v1", router);

app.use(errorHandler);

const server = http.createServer(app);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        server.listen(PORT, () =>
            console.log(`Server is listening to port ${PORT}`)
        );
    } catch (err) {
        console.log(err);
    }
};

startServer();
