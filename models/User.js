/**
 * Created by Administrator on 11/11/2016.
 */


var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({

    email:String,
    password:String

});

UserSchema.methods.toJSON = function(){

    var user = this.toObject();
    delete user.password;
    return user;
};

UserSchema.methods.comparePasswords = function(password, callback){

    console.log('first line: '+password);
    console.log('second line: '+this.password);
    bcrypt.compare(password, this.password, callback);
};

UserSchema.pre('save',function(next){

    var user = this;

    if(!user.isModified('password')){
        return next();
    }

    bcrypt.genSalt(10,function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password,salt,null,function(err, hash){

                if(err) return next(err);

                user.password = hash;
                next();
            })
    })

});

module.exports = mongoose.model('User',UserSchema);