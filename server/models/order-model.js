const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema(
    {
        Id: {type:Number, required:true},
        Message:{type:String, required:true},
    },{timestamps:true},
)

module.exports = mongoose.model('orders',Order)