<template>
  <div class="home">
    <div class="main-content">
      <div class="container mt-3">
        <div class="col">
          <div class="card shadow">
            <div class="card-header border-0">
              <h3 class="mb-0">Пользователи</h3>
            </div>
            <div class="table-responsive">
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Верификация</th>
                    <th scope="col">id</th>
                    <th scope="col">Ник</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Фамилия</th>
                    <th scope="col">Рейтинг</th>
                    <th scope="col">
                      Положительные/
                      <br />Отрицательные
                      <br />оценки
                    </th>
                    <th scope="col">
                      Завершенные
                      <br />сделки
                    </th>
                    <th scope="col">Сумма сделок</th>
                    <th scope="col">
                      Отмененные
                      <br />сделок
                    </th>
                    <th scope="col">
                      Проигранные
                      <br />споры
                    </th>
                    <th scope="col">Блок</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user,index) in usersArr.data" v-bind:key="index">
                    <th scope="row">
                      <span class="badge badge-dot mr-4">
                        <i v-if="user.verification" class="bg-success"></i>
                        <i v-else class="bg-warning"></i>
                        {{user.verification}}
                      </span>
                    </th>
                    <td>{{user.id}}</td>
                    <td>{{user.id}}</td>
                    <td>{{user.firstName}}</td>
                    <td>{{user.lastName}}</td>
                    <td>{{user.rating}}</td>
                    <td class="flexCenter">
                      <span class="badge badge-dot mr-4">
                        <!-- <i class="fas fa-angle-up"></i> -->
                          {{user.goodReviews}} / {{user.goodReviews}} 
                        <!-- <i class="fas fa-angle-down"></i> -->
                      </span>
                    </td>
                    <td class>{{user.successfulDeals}}</td>
                    <td class>{{user.sumDeals}}</td>
                    <td>{{user.canceledDeals}}</td>
                    <td>{{user.controversy}}</td>
                    <td>{{user.blockedByUsers}}</td>
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
                    :to="{ name: 'Users', params: {count:1} }"
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
                      :to="{ name: 'Users', params: {count:count-1} }"
                      tag="a"
                    >{{count-1}}</router-link>
                  </li>
                  <li class="page-item disabled">
                    <a class="page-link">{{count}}</a>
                  </li>
                  <li class="page-item" @click="refresh">
                    <router-link
                      class="page-link"
                      :to="{ name: 'Users', params: {count:count+1} }"
                      tag="a"
                    >{{count+1}}</router-link>
                  </li>
                  <li class="page-item" @click="refresh">
                    <router-link
                      class="page-link"
                      :to="{ name: 'Users', params: {count:count+2} }"
                      tag="a"
                    >{{count+2}}</router-link>
                  </li>
                  <li class="page-item" @click="refresh">
                    <router-link class="page-link" 
                    :to="{ name: 'Users', params: {count:count+1} }"
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
  name: "home",
  components: {},
  data() {
    return {
      usersArr: "null",
      createNewCollectionName: "",
      count: Number(this.$route.params.count)
    };
  },
  mounted() {
    this.showItems();
  },
  methods: {
    refresh() {
      this.count = Number(this.$route.params.count);
      this.showItems();
    },
    showItems() {
      axios
        .post("http://192.168.1.197:4000/users/find", {
          skip: (this.count - 1) * 10,
          limit: 10
        })
        .then(response => (this.usersArr = response));
    }
  }
};
</script>

<style>
</style>
