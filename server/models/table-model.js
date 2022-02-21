const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Table = new Schema(
    {
        LastId: {type:Number, required:true},
        Name:{type:String, required:true},
    },
)

module.exports = mongoose.model('tables',Table)