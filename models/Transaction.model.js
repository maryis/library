const db = require('../bootstrap/db');
const Schema = db.Schema;

const UserSchema = new Schema({
    ISBN: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    total_quantity: {type: Number, default: 1},
    rented_quantity: {type: Number, default: 0},
    authors: [{
        name: {type: String, required: true},
        family: {type: String}
    }],
    comments: [{
        msg: {type: String},
        userId: {type: Schema.Types.ObjectId, ref: 'User'},
        rate: {type: Number, default: 0}
    }]


}, {
    collection: 'books',
    timestamps: true
});


module.exports = db.model('Book', UserSchema);