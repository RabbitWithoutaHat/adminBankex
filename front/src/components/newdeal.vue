<template>
<div class="main-content">
   <div class="container mt-3">
      <!-- Table -->
       <!-- <h2 class="mb-5">Tables Example</h2><div class="row">  -->

        <div class="col">
          <div class="card shadow">
            <div class="card-header border-0">
              <h3 class="mb-0">Новая сделка</h3>
            </div>
   <form v-on:submit.prevent="onSubmit" class="dealSelect">
      <div class="row">
         <div class="form-group col-6 text-left">
            <label for="currency">Валюта</label>
               <select @click="clickCur" v-model="currency" id="currency" class="custom-select" required>
                  <option value=""></option>
                  <option value="usd">Доллар</option>
                  <option value="eur">Евро</option>
                  <option value="gbp">Фунт стерлингов</option>
                  <option value="chf">Швейцарский франк</option>
                  <option value="pln">Польский злотый</option>
                  <option value="bitC">Bitcoin</option>
               </select>
            <div class="invalid-feedback">Необходимо заполнить все поля</div>

            <label for="type">Тип сделки</label>
            <select @click="clickCur" v-model="typeofdeal" id="type" class="custom-select typedeal" required>
               <option value=""></option>
               <option value="sale">Покупка</option>
               <option value="buy">Продажа</option>
            </select>
            <div class="invalid-feedback">Необходимо заполнить все поля</div>
         </div>
         <div class="form-group col-3 text-left">
            <label for="payment">Способ оплаты</label>
            <select id="payment" class="custom-select" size="5" required>
               <option value="1">Банковский перевод</option>
               <option value="2">Электронные платежи</option>
               <option value="3">Wire Transfer</option>
               <option value="3">Подарочные карты</option>
               <option value="3">Другое</option>
            </select>
            <div class="invalid-feedback">Необходимо заполнить все поля</div>
         </div>
         <div class="form-group col-3 text-left">
            <label for="bank">Банк</label>
            <select id="bank" class="custom-select" size="5" required>
               <option value="1">Сбербанк</option>
               <option value="2">Тинькофф</option>
               <option value="3">С карты на карту</option>
               <option value="3" >Альфа-Банк</option>
            </select>
            <div class="invalid-feedback">Необходимо заполнить все поля</div>
         </div>

      </div>
         <div class="row justify-content-start ">
            <div class="currentdeal col-6">

               <input v-model="quantity" @input="clickCur" type="number" class="typeNumber" placeholder="Количество">
            </div>
            <input v-if="typeofdeal === 'sale'" type="submit" class="btn btn-lg dealButton col-2 "  value="Найти сделку">
            <input v-if="typeofdeal === 'buy'" type="number"  v-model="price" class="typeNumber col-2 ml-auto mr-0"  placeholder="Курс" required>
            <input v-if="typeofdeal === 'buy'" type="submit" class="btn btn-lg dealButton col-2"  value="Создать сделку">
         </div>
   </form>
            <div class="table-responsive">
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Номер <br>в обменнике</th>
                    <th scope="col">Продавец</th>
                    <th scope="col">Покупатель</th>
                    <th scope="col">Тип</th>
                    <th scope="col">Кол-во <br>по курсу</th>
                    <th scope="col">Статус</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Комментарий</th>
                    <th scope="col">Дата</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) of list" :key="index">
                    <th scope="row">
                        {{item.number}}
                    </th>
                    <td>
                      {{item.seller}}
                    </td>
                    <td>
                      {{item.buyer}}
                    </td>
                    <td>
                      <span class="badge badge-dot mr-4">
                        <i class="bg-warning"></i> {{item.type}}
                      </span>
                    </td>
                    <td>
                      {{item.quantity}} по {{item.price}}
                    </td>
                    <td class="">
                      {{item.status}}
                    </td>
                    <td class="">
                      {{item.rating}}
                    </td>
                    <td >
                      <div id="comment">
                        {{item.comment}}
                      </div>
                    </td>
                    <td class="">
                      {{item.date}}
                    </td>
                  </tr>
                  </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'newDeal',
  data() {
     return {
        currency: '',
        typeofdeal: '',
        quantity: 0,
        list: [],
        price: 0
     }
  },
  computed: {
     filterdata() {
        if (this.currency.length > 0 && this.typeofdeal.length > 0 && this.typeofdeal === 'sale' ) {
           axios.post('http://192.168.1.197:4000/deals/findtype',{
               type: this.typeofdeal, typeCurrency: this.currency, quantity: this.quantity })
            .then(response => {
            this.list = response.data
            return this.currency
            })
        }
        if(this.typeofdeal === 'buy') {
           this.list = []
        }
     }
  },
  methods: {
     clickCur: function() {
        this.filterdata
     },
     onSubmit: function() {
        console.log('ok');
        console.log(this.currency);

         axios.post('http://192.168.1.197:4000/deals/createnew',{
               type: this.typeofdeal,
               quantity: this.quantity,
               price: this.price,
               typeСurrency: this.currency,
               })
            .then(response => {
            this.list = response.data
            return this.currency
            })
     }
  }
}
</script>
<style scoped>
.dealSelect{
   padding: 40px;
   padding-top: 10px;
}
.dealButton{
   background-color: #5e71e4;
   border: 1px solid #e9ecef;
   color: #fff;
   margin-left: auto;
   margin-right: 12px;
}

select option[size]:checked{
    background-color: #000!important;
    color: rgb(175, 53, 53);
}
select {
   margin-bottom: 10px;
}
label {
 font-size: 0.8rem;
 margin-left: 12px;
 margin-bottom: 4px;
}
input {
    display: inline-block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: .375rem 1.75rem .375rem .75rem;
    line-height: 1.5;
    color: #495057;
    vertical-align: middle;
    background-size: 8px 10px;
    border: 1px solid #ced4da;
    border-radius: .25rem;
}
.currentdeal {
   padding-left: 15px;
   padding-right: 15px;
}
.typeNumber{
   padding-right: 8px;
}
</style>
