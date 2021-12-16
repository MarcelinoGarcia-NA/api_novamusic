const {Schema, model}= require("mongoose");

const CategorySchema= new Schema(
    {
    name_category:{
        type: String,
        required: true,
        unique: true,
        uppercase:true
    },
    users:[
        {
            type: Schema.Types.ObjectId,
            ref:"User"
        }
    ]

    },

    {
        timestamps:true
    }

);

module.exports =model("Category",CategorySchema);