<template>
  <div class="home">
    <div class="main-content">
      <div class="container mt-3">
        <div class="col">
          <div class="card shadow">
            <div class="card-header border-0">
              <h2 @click="refresh" class="mb-0">Сделки</h2>
              <div class="filterMenu">
              <div class='filterMenu'>
                <form class='filterMenu'>
                <input id="findUser1" type="text" class="custom-select mb-0" v-model="userfind">
                <input @click.prevent="showItems('findname',userfind)" type="submit" class="btn dealButton " value="Найти пользователя" >
                </form>
              </div>
              <!-- <select class="custom-select mb-0" required>
              <option value="">Валюта</option>
              <option value="1">Dollar</option>
              <option value="2">Euro</option>
              </select> -->
              <!-- <select class="custom-select mb-0" required>
              <option value="">Валюта</option>
              <option value="1">Dollar</option>
              <option value="2">Euro</option>
              </select> -->
                <div class="mb-0"> </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">
                      Номер
                      <br />в обменнике
                    </th>
                    <th scope="col">Продавец</th>
                    <th scope="col">Покупатель</th>
                    <th scope="col">Тип</th>
                    <th scope="col">
                      Кол-во
                      <br />по курсу
                    </th>
                    <th scope="col">Статус</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Комментарий</th>
                    <th scope="col">Дата</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(deal,index) in dealsArr.data" v-bind:key="index">
                    <th scope="row">{{deal.number}}</th>
                    <td>{{deal.seller}}</td>
                    <td>{{deal.buyer}}</td>
                    <td>
                      <span class="badge badge-dot mr-4">
                        <!-- <i class="bg-warning"></i> -->
                       {{deal.type}}  / {{deal.typeCurrency}}
                      </span>
                    </td>
                    <td>{{deal.quantity}} по {{deal.price}}</td>
                    <td class>{{deal.status}}</td>
                    <td class>{{deal.rating}}</td>
                    <td>
                      <div id="comment">{{deal.comment}}</div>
                    </td>
                    <td class>{{deal.date}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card-footer py-4">
              <nav aria-label="...">
                <ul class="pagination justify-content-end mb-0">
                  <li class="page-item" @click="refresh">
                    <router-link 
                    v-if="count>1" 
                    class="page-link" 
                    :to="{ name: 'Deals', params: {count:1} }"
                    tag="a"
                    >
                      <i class="fas fa-angle-double-left"></i>
                      <span class="sr-only">Previous</span>
                    </router-link>
                  </li>
                  <li class="page-item" @click="refresh">
                    <router-link
                      v-if="count>1"
                      class="page-link"
                      :to="{ name: 'Deals', params: {count:count-1} }"
                      tag="a"
                    >{{count-1}}</router-link>
                  </li>
                  <li class="page-item disabled">
                    <a class="page-link">{{count}}</a>
                  </li>
                  <li class="page-item" @click="refresh">
                    <router-link
                      class="page-link"
                      :to="{ name: 'Deals', params: {count:count+1} }"
                      tag="a"
                    >{{count+1}}</router-link>
                  </li>
                  <li class="page-item" @click="refresh">
                    <router-link
                      class="page-link"
                      :to="{ name: 'Deals', params: {count:count+2} }"
                      tag="a"
                    >{{count+2}}</router-link>
                  </li>
                  <li class="page-item" @click="refresh">
                    <router-link class="page-link" 
                    :to="{ name: 'Deals', params: {count:count+1} }"
                    tag="a">
                      <i class="fas fa-angle-right"></i>
                      <span class="sr-only">Next</span>
                    </router-link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "vue-router";

export default {
  el: '#findUser1',
  name: "Deals",
  components: {},
  data() {
    return {
      userfind:'',
      dealsArr: [],
      createNewCollectionName: "",
      count: Number(this.$route.params.count)
    };
  },
  watch:{
    userfind: function(inn){
      showItems('findname',inn)
    }
  },
  computed:{
    
  },
  mounted() {
    this.showItems();
  },
  methods: {
    refresh() {
      this.count = Number(this.$route.params.count);
      this.showItems();
    },
    showItems(string = "find",filter="number") {
      axios
        .post(`http://localhost:3000/deals/${string}`, {
          skip: (this.count - 1) * 10,
          limit: 10,
          filter:filter,
        })
        .then(response => (this.dealsArr = response));
    }
  }
};
</script>

<style>
.custom-select{
  margin-right: 1rem !important
}

.dealButton{
   background-color: #5e71e4;
   border: 1px solid #e9ecef;
   color: #fff;
   height: 2.5rem;
   width: 190px;
}
</style>
