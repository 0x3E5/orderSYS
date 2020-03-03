const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommoditySchema = new Schema({
    img:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    describe:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    onSale:{
        type:Number,
        default:0
    }
});

module.exports = Commodity = mongoose.model('commodity',CommoditySchema);