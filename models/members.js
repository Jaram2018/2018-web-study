var mongoose = require('mongoose');

var memberSchema = mongoose.Schema({
    StudentID : {
        type : Number,
        required: true
    },
    name : {
        type: String,
        required: true
    }
    
})