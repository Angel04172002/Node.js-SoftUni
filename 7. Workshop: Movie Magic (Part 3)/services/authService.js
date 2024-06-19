const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const config = require('../config/config');


exports.register = (userData) => User.create(userData);

exports.login = async (email, password) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Username or password is not correct!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid) {
        throw new Error('Username or password is not correct!');
    }

    const payload = {
        id: user._id,
        email: user.email
    };

    const token = await jwt.sign(payload, config.SECRET);

    return token;
};
