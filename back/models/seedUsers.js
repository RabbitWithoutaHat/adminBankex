const mongoose = require('mongoose');
const User = require('./user');
const randomName = require('random-name')
const Deal = require('./deal');
mongoose.connect('mongodb://localhost/bankex', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
let count = 0
let link = mongoose.connection
const bool = [true,false];
const sale = ['sale','buy'];
const rub = ['usd','eur','gbp','chf','pln','bitC'];
const rating = ['-1','0','1'];
const statysSeed = ['ожидание','отменена'];
const paymentSeed = ['Банковский перевод','Электронные платежи','Wire Transfer','Подарочные карты','Другое'];
const bankSeed = ['Сбербанк','Тинькофф','С карты на карту','Альфа-Банк'];

async function seed(inn = {}) {
    // const task = new User({
    //     name:randomName.middle(),
    //     firstName: randomName.first(),
    //     lastName: randomName.last(),
    //     password: idGenerate(4),

    //     id:idGenerate(4),
    //     verification: bool[getRandom(0, 1)],
    //     rating: getRandom(0, 1000),
    //     goodReviews: getRandom(0, 10),
    //     badReviews: getRandom(0, this.goodReviews),
    //     successfulDeals:getRandom(0, 10),
    //     sumDeals:getRandom(0, 10000),
    //     canceledDeals: getRandom(0, 5),
    //     controversy: getRandom(0, 5),
    //     blockedByUsers: getRandom(0, 5),
    // });
    // await task.save();
    // return true

    const task = new Deal({
        type:sale[0],
        typeCurrency: rub[getRandom(0, 5)],

        // buyer: randomName.first(),
        seller: randomName.first(),
        number: count,
        quantity : getRandom(0, 100),
        price: getRandom(0, 50),
        status: 'поиск',//statysSeed[getRandom(0, 1)],       //статус
        rating:  rating[getRandom(0, 2)],      //оценка
        comment:  idGenerate(9),
        date: idGenerate(5),
        payment:paymentSeed[getRandom(0, 4)],
        bank:bankSeed[getRandom(0, 3)],
        });
        await task.save();
        return true
     
}
let buer = '';
let seller = '';

async function findUsers(){
    const data = await User.find()
    // console.log(data);
    
    const rand = await getRandom(0,data.length)
    // console.log(data[rand].id);
    
    return await data[rand].id
    
}

function idGenerate(num = 7){
    let arr = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','1','2','3','4','5','6','7','8','9','0']
    let id = [];
    for (let i = 0; i < num; i++) {
        id.push(arr[(Math.random() * (arr.length - 0) + 0).toFixed()])        
    }
    return id.join('')
}

function getRandom(min = 0,max = 100){
    const num = Math.random() * (max - min) + min;
    return num.toFixed()
}

// findUsers()
async function seeed (num = 0) {
    for (let i = 0; i < num; i++) {
       const a = await seed()
       count++
    }
    console.log('end')
}

seeed(100)
// findUsers()[getRandom(0, findUsers().length)]