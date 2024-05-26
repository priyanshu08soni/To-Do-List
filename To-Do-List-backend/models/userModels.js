const mongoose = require('mongoose'); // Erase if already required
const bcrypt=require('bcrypt');
const crypto=require('crypto');
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
      
    },
    lastname:{
        type:String,
        required:true,
      
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",
    }
},{
    timestamps:true,
});
//already defined
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt =await bcrypt.genSaltSync(10);
    this.password=await bcrypt.hash(this.password,salt);
});
//created methods
userSchema.methods.isPasswordMatched=async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
userSchema.methods.createPasswordResetToken=async function(){
    const resettoken=crypto.randomBytes(32).toString("hex");
    this.PasswordResetToken=crypto.createHash('sha256').update(resettoken).digest('hex');
    this.passwordResetExpire=Date.now()+30*60*1000;//10 Min
    return resettoken;
}

//Export the model
module.exports = mongoose.model('User', userSchema);