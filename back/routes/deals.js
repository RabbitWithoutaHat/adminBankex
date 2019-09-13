const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { sessionChecker } = require('../middleware/auth');
const Deal = require('../models/deal');

//отдает все сделки массивом .. sessionChecker(авторизация) отключена
router.post('/find', async (req, res) => {
    const data = await Deal.find().sort({number:-1}).limit(req.body.limit).skip(req.body.skip) //{ $exists: false }
    res.json(data)
});

//отдает все сделки(c фильтром по пораметрам type и typeСurrency) массивом .. sessionChecker(авторизация) отключена
router.post('/findtype', async (req, res) => {
    const data = await Deal.find({type:req.body.type,
    typeCurrency:req.body.typeCurrency,status:'поиск', quantity:{$gt:req.body.quantity-1}})
    .sort({number:-1}) //{ $exists: false }
    res.json(data)
});

router.post('/findname', async (req, res) => {
    const data = await Deal.find({$or:[{seller:req.body.filter},{buyer:req.body.filter}]}).sort({number:-1}) //{ $exists: false }
    res.json(data)
});




//создаю новую сделку
router.post('/createnew', async (req, res) => {
    let date = new Date(); 
    date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
    const number = await Deal.find()
    const data11 = await new Deal({
        typeСurrency:req.body.typeСurrency,
        seller:req.body.seller,
        type:req.body.type,
        number:number.length+1,
        quantity:req.body.quantity, 
        price:req.body.price,
        status:'поиск',
        rating:'',      //оценка
        comment:'',
        date:date,
        payment:req.body.payment,
        bank:req.body.bank,
    })
    await data11.save();
    res.send(true)
});

//
router.delete('/:id', async (req, res) => {
    const data = await User.findByIdAndDelete(req.params.id)   //Collection.findByIdAndRemove
    // console.log(data)
    // await data.save();
    res.send(true)
});


module.exports = router;

// &&{buyer:req.body.filter}