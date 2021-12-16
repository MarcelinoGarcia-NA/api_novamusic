const express = require("express");

const router = express.Router();



module.exports ={
    async exibir(req, res){
           return res.send({ok : true});
    }
}