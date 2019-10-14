import Vue from 'vue';
import Router from 'vue-router';
import Users from '@/components/users';
import Deals from '@/components/deals';
import NewDeal from '@/components/newdeal';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/deals/:count',
      name: 'Deals',
      component: Deals,
      props: true,
      // params: {id:1},
      // props:{count:1},
    },
    {
      path: '/newdeal',
      name: 'NewDeal',
      component: NewDeal,
      props: true,
    },
    {
      path: '/users/:count',
      name: 'Users',
      component: Users,
      props: true,
    },
  ],
});
