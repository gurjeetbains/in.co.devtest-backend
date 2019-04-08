const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    adContent: {
        type: String,
        required: true,
        minlength: 300
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    },
    imagevideo:{
        type: String,
    },
    dateCreated: {
        type:Date,
        default: Date.now()
    },
    adType:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ads', postSchema);