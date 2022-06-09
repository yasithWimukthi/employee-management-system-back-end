import mongoose from 'mongoose';

const {Schema} = mongoose;

const departmentSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    designation:[{
        type: String,
        trim: true,
        required: true
    }]
},{timestamps:true});

export default mongoose.model('Department',departmentSchema);