const mongoose =  require('mongoose');

const uri = `mongodb://127.0.0.1:27017/library`;

mongoose
    .connect(uri, { useNewUrlParser: true })
    .then(() => {
        console.log('CONNECTION Successful!');
    })
    .catch(err => {
        console.log('Failed to connect db\n', err);
    });


module.exports = mongoose;