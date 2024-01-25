const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timeStamps: true })

const UserModel = mongoose.model('users', userSchema);

let model = {
	name: 'users',
	schema: userSchema
};

module.exports = {
	UserModel,
	model
};