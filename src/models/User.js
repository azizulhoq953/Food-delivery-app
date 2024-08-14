import { model, models, Schema } from "mongoose";
import bcrypt from 'bcrypt';
import { type } from "os";
 
const UserSchema = new Schema({
    image: {type: String},
    name: {type: String},
    email: {type: String, required: true, unique: true},
    password: { type: String,},
    phone: {type: String},
    streetAddress: {type: String},
    postalCode: {type: String},
    city: {type: String},
    Country: {type: String},
},{timestamps: true});

export const User = models?.User || model('User', UserSchema);