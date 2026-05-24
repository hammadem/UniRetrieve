const mongoose = require ('mongoose');
const {Schema, model} = mongoose;
const Claim = require('./claims');
const User = require('./users');

let itemSchema = new Schema ({
    title: String,
    location: String,
    description: String,
    image: {
        type: String,
        default: "https://i0.wp.com/denvergripco.com/wp-content/uploads/woocommerce-placeholder.png",
    },
    questions: [String],
    claims: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Claim',
    }],
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

let Item = new model('Item', itemSchema);

module.exports = {Item};