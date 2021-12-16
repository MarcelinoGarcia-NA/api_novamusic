const {Schema, model}= require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema= new Schema(
    {
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    password:{
        type: String,
        required: true,
        select:false
    },
    name_artistic:{
        type: String,
        required: true,
        unique: true,
    },
    telephone:{
        type: String,
        required: true
    },
    data_show:{
        type: String,
        required: false
    },
    horario_show:{
        type: String,
        required: false
    },
    sobre_me:{
        type: String,
        required: false
    },
    style_music:{
        type: String,
        required: true
    },
    link_youtube:{
        type: String,
        required: true
    },
    link_whats:{
        type: String,
        required: true
    },
    price_cache:{
        type: String,
        required: true
    },
    views:{
        type: String,
        required: true
    },

    isAdmin:{
        type: Boolean,
        default:false
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        require:true
    },
    schedule:{
        type: Schema.Types.ObjectId,
        ref: "Schedule",
    },


    },

    {
        timestamps:true
    }

);

UserSchema.pre('save',async function(next){
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;

    next();
});



    module.exports =model("User",UserSchema);