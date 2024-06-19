const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});


userSchema.pre('save', async function () {

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
});

userSchema.virtual('rePassword')
    .set(function (value) {

        if (this.password != value) {
            throw new mongoose.MongooseError("Passwords dont match!");
        }

    });


const User = mongoose.model('User', userSchema);

module.exports = User;