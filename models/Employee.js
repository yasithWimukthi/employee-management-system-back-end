import mongoose from 'mongoose';

const {Schema} = mongoose;

const employeeSchema = new Schema({
    firstName:{
        type: String,
        trim: true,
        required: true
    },
    lastName:{
        type: String,
        trim: true,
        required: true
    },
    birthDate:{
        type: Date,
        trim: true,
        required: true
    },
    address:[
        {
            type: String,
            trim: true,
            required: true
        }
    ],
    contactNumber:[
        {
            type: String,
            trim: true,
            required: true
        }
    ],
    department:{
        type: String,
        trim: true,
        required: true
    },
    designation:{
        type: String,
        trim: true,
        required: true
    },
    employeeId:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    nic:{
        type: String,
        trim: true,
        required: true,
        unique: true
    }
},{timestamps:true});

export default mongoose.model('Employee',employeeSchema);