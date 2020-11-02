const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
})

let posts = mongoose.model('posts',postSchema);

module.exports = posts;