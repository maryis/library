const db = require('../bootstrap/db');
const Schema = db.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username : { type: String, required: true , unique:true },
    password : { type: String, required: true },
    contact : { address: {type:String},
                email: {type:String, required:true}},
    isAdmin:{type:Boolean, default: false}
},{
    collection: 'users',
    timestamps: true
});


// Mongoose Hooks
UserSchema.pre('save', function(next){
    let user = this;
    if (user.isModified('password') || user.isNew){
        bcrypt.genSalt(10, function(err, salt){
            if (err) throw new Error(err);
            bcrypt.hash(user.password, salt, function(err, hashedPass){
                if (err) throw new Error(err);
                user.password = hashedPass;
                next();
            })
        });
    } else { next() }
});
UserSchema.post('read', function(next){
    let user = this;
    if (user.isModified('password') || user.isNew){
        bcrypt.genSalt(10, function(err, salt){
            if (err) throw new Error(err);
            bcrypt.hash(user.password, salt, function(err, hashedPass){
                if (err) throw new Error(err);
                user.password = hashedPass;
                next();
            })
        });
    } else { next() }
});


UserSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, function(err, isMatch){
        cb(err, isMatch);
    });
}


module.exports = db.model('User', UserSchema);