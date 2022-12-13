const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    //Add array of boardgame schemas
});

// Middleware to handle password hash
UserSchema.pre('save', async function(next) {
    if(!this.username.isModified('password')){
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err){
            return next(err);
        }

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err){
                return next(err);
            }

            user.password = hash;
            next();
        })
    })

});

// Method to compare given password to hashed password
UserSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err){
            return cb(err);
        }

        cb(null, isMatch);
    });
};

module.exports = model('user', UserSchema);