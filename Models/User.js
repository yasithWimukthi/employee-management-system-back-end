import mongoose from 'mongoose';

const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type:String,
        trim:true,
        required: true,
        unique: true
    },
    password:{
        type:String,
        trim:true,
    }
},{timestamps:true});

export default mongoose.model('User',userSchema);