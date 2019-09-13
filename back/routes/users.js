const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { sessionChecker } = require('../middleware/auth');
const User = require('../models/user');
const bool = [true,false]
//отдает всех юзеров массивом .. sessionChecker

router.post('/find', async (req, res) => {
    const data = await User.find().limit(req.body.limit).skip(req.body.skip) //{ $exists: false }
    res.json(data)
});


//создаю нового юзера
router.post('/', async (req, res) => {
    // console.log(req);
    
    const data = await new User({
        name : req.body.name,
        firstName : req.body.name,
        lastName : req.body.name,
        password : req.body.name,

        id:idGenerate(),
        verification: bool[getRandom(0, 2)-1],
        rating: getRandom(0, 1000),
        goodReviews: getRandom(0, 10),
        badReviews: getRandom(0, this.goodReviews),
        successfulDeals:getRandom(0, 10),
        sumDeals:getRandom(0, 10000),
        canceledDeals: getRandom(0, 5),
        controversy: getRandom(0, 5),
        blockedByUsers: getRandom(0, 5),
    })
    await data.save();
    res.send(true)
});

//
router.delete('/:id', async (req, res) => {
    const data = await User.findByIdAndDelete(req.params.id)   //Collection.findByIdAndRemove
    // console.log(data)
    // await data.save();
    res.send(true)
});

function idGenerate(){
    let arr = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','1','2','3','4','5','6','7','8','9','0']
    let id = [];
    for (let i = 0; i < 7; i++) {
        id.push(arr[(Math.random() * (arr.length - 0) + 0).toFixed()])        
    }
    return id.join('')
}
function getRandom(min = 0,max = 100){
    
    const num = Math.random() * (max - min) + min;
    console.log(num);
    
    return num.toFixed()
}

module.exports = router;