const {Schema, model}= require("mongoose");

const ScheduleSchema= new Schema(
    {
    name_city:{
        type: String,
        unique: true,
        uppercase:true
    },
    date:{
        type: Date
   
    },
    hour:{
        type: String
    },
    locate:{
        type: String
    },
    users:[
        {
            type: Schema.Types.ObjectId,
            ref:"schedule"
        }
    ]

    },

    {
        timestamps:true
    }

);

module.exports =model("Schedule",ScheduleSchema);