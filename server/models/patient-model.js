const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Patient = new Schema(
    {
        Id: {type:Number, required:true},
        Name:{type:String, required:true},
        OrderId:{type:Number, required:true},
    },{timestamps:true},
)

module.exports = mongoose.model('patients',Patient)