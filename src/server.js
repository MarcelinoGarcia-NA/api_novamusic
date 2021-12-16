const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors= require("cors");

//mongodb+srv://Mvitor97:mvitor1500@novamusic.ccb86.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect("mongodb://localhost:27017/novamusic",{
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