const mongoose = require('mongoose'); // Erase if already required
//Task Schema
var taskSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true,
      
    },
    description:{
        type:String,
        required:true,
      
    },
    status:{
        type:String,
        default:"pending"
    },
    duedate:{
        type:Date,
        required:true,
    }
},{
    timestamps:true,
});

//Export the model
module.exports = mongoose.model('Task', taskSchema);