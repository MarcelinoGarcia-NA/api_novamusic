const {Schema, model}= require("mongoose");

const ImageSchema= new Schema(
    {
    id_user:{
        type: String,
        required: true,
        unique: true,
    },
    local_image:{
        type: String,
        required: true,
        unique: true,
    }
    }
);



    module.exports =model("Image",ImageSchema);