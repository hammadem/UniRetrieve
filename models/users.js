const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const uniqueValidator = require('mongoose-unique-validator').default;
const bcrypt = require('bcrypt')
const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        uniqueCaseInsensitive: true, 
    },
    password: { 
        type: String, 
        required: true 
    }
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    
});

userSchema.methods.isValidPassword = async function (plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
};
userSchema.plugin(uniqueValidator,{message: 'A user with the given email is already registered'})

let User = new model('User',userSchema);

module.exports = { User };