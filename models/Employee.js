import mongoose from 'mongoose';

const {Schema, ObjectId} = mongoose;

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
        type: ObjectId,
        ref: 'Department',
    },
    designation:{
        type: String,
        trim: true,
        required: true
    },
    employeeId:{
        type: String,
        trim: true,
        required: true
    },
    nic:{
        type: String,
        trim: true,
        required: true
    }
},{timestamps:true});

export default mongoose.model('Employee',employeeSchema);