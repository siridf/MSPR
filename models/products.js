const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    createdAt : {
        type : Date, 
        required : true, 
        default : Date.now
    },

    name : {
        type : String, 
        required : true
    }, 

    price : {
        type : Number, 
        required : true
    }, 

    description : {
        type : String, 
        required : false
    }, 

    color : {
        type : String, 
        required : false
    }, 

    stock : {
        type : String, 
        required : true
    }
})

module.exports = mongoose.model('Products', productSchema)

