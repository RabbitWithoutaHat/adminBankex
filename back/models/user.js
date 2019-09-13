const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name:String,
    firstName:String,
    lastName:String,
    password:String,

    id:String,
    verification:Boolean,
    rating:Number,
    goodReviews:Number,
    badReviews:Number,
    successfulDeals:Number,
    sumDeals:Number,
    canceledDeals:Number,
    controversy:Number,
    blockedByUsers:Number,
});

module.exports = model('Users', UserSchema);