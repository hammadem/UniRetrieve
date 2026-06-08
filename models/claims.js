const mongoose = require('mongoose');
let { Schema,model } = mongoose;

let claimSchema = new Schema({
    name: String,
    contact: String,
    answers: [String],
    explaination: String,
    image: String,
});

let Claim = new model('Claim',claimSchema);

module.exports = { Claim }