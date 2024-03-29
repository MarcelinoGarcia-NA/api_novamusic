const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors= require("cors");

mongoose.connect("mongodb+srv://mvitor97:mvitor97@cluster0.wvw2d.mongodb.net/NovaMusicBD?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify: false
});

mongoose.set("useCreateIndex",true);

module.exports = mongoose;

const server= express();
server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);
