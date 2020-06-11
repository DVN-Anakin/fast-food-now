import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Filters from './filters/filters';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { routes } from './routes';
import { store } from './store/store';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Filters);

const router = new VueRouter({
  routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    savedPosition ? savedPosition : { x: 0, y: 0 };
  }
});

// // Global navigation guard example
// router.beforeEach((to, from, next) => {
//   if (to.path === '/admin') {
//     alert("This area is for authorised users only. Please login to continue.");
//     next();
//   } else {
//     next();
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
