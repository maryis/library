const db = require('../bootstrap/db');
const Schema = db.Schema;

const TransSchema = new Schema({

    trans_time: {type: Date, required: true},
    customer: {type: Schema.Types.ObjectId, ref:'User', required:true},
    books: [{
        quantity: {type: Number},
        bookId: {type: Schema.Types.ObjectId, ref: 'Book'}}]

}, {
    collection: 'trans',
    timestamps: true
});


module.exports = db.model('Transaction', TransSchema);