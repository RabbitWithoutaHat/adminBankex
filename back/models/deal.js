const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const DealSchema = new Schema({
    typeСurrency:String,
    buyer:String,
    seller:String,
    number:Number,
    type:String,
    quantity:String,//цена и колличество
    price:String,
    status:String,       //статус
    rating:String,      //оценка
    // comment:String,
    date:Date,
    payment:String,
    bank:String,
});


module.exports = model('Deal', DealSchema);