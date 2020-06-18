## Local dev
1. Instal Vue CLI - Standard Tooling for Vue.js Development https://cli.vuejs.org/ 
```
npm i -g @vue/cli
```
2. Create new Vue project: `vue create .` to install Vue CLI plugins in the current directory
3. Install Bootstrap `npm install bootstrap jquery popper.js`
4. In terminal
- Compiles and hot-reloads for development `npm run serve`
- Compiles and minifies for production `npm run build`
- Lints and fixes files `npm run lint`

### Firebase setup
1. in Firebase: Create new project → create a Firebase database for the project → add the project to your web app → copy your web app's Firebase configuration
2. In your project folder install Firebase:
```
npm i firebase
```

In `src` create a new file `firebase.js` with your Firebase setup:
```
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    // here paste your web app's Firebase configuration
};

firebase.initializeApp(config);

const db = firebase.firestore();

export const dbMenuRef = db.collection('menu');
```

### Vue Router setup
1. Install `vue-router`:
```
npm i vue-router
```
2. Import and setup `vue-router` in `src/main.js`:
```
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    savedPosition ? savedPosition : { x: 0, y: 0 };
  }
});

new Vue({
    router,
    render: h => h(App)
}).$mount("#app")
```
3. Put your routes in `src/routes.js`:
```
import Home from './components/Home';
import Menu from './components/Menu';
import OrderingGuide from './components/OrderingGuide';
import Delivery from './components/Delivery';
import History from './components/History';
import Contact from './components/Contact';
import Admin from './components/Admin';

export const routes = [
    { 
        path: "/", 
        name: "homeLink", 
        components: {
            default: Home,
            'ordering-guide': OrderingGuide,
            'delivery': Delivery,
            'history': History
        }
    }, { 
        path: "/menu", 
        name: "menuLink", 
        component: Menu 
    }, { 
        path: "/ordering-guide", 
        name: "orderingGuideLink", 
        component: OrderingGuide 
    }, { 
        path: "/delivery", 
        name: "deliveryLink", 
        component: Delivery 
    }, { 
        path: "/history", 
        name: "historyLink", 
        component: History 
    }, { 
        path: "/contact", 
        name: "contactLink", 
        component: Contact 
    }, { 
        path: "/admin", 
        name: "adminLink", 
        component: Admin, 
        beforeEnter: (to, from, next) => {
            // Individual route guard
            alert("This area is for authorised users only. Please login to continue.");
            next();
        }
    }, { 
        path: "*", 
        redirect: "/" 
    }
];
```

### Vuex setup
1. Instal `vuex`
```
npm i vuex
```
2. `src/store/store.js`:
```
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(vuex);

export const store = new Vuex.store({
    state: {
        // Your state
    },
    getters: {
        // Your getters
    },
    mutations: {
        // Your mutations
    },
    actions: {
        // Your actions
    }
})
```
3. In `src/main.js` you need to include `store` into your `Vue` instance:
```
import { store } from './store/store';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
```
4. In your component's `.vue` files you now can access and output `store`'s `state` from within the `computed` object:
Example `src/components/menu.vue`:
```
computed: {
    getMenuItems() {
        // Returning a getter getMenuItems which has access to state's property menuItems
        return this.$store.getters.getMenuItems;
    }
}
```
Printing `state`'s property `menuItems` into the `menu.vue` template:
```
<table class="table table-borderless mt-5 mb-10" v-for="item in getMenuItems" v-bind:key="item.id">
    ...
```

## Vuexfire setup
1. Install `vuexfire` pkg to sync Vuex with Firebase:
```
npm i vuexfire
```
2. Import `vuexfireMutations` into `src/store/store.js`, so whenever Firebase DB's data change, `vuexfireMutations` will accordingly mutate the `state` to be in sync. 

In `src/store/store.js` you can bind Firebase DB reference (i.e. a collection) with your app's state properties using an action `firestoreAction()` which contains a method `bindFirestoreRef(firesbaseDBref, appStateProperty)`:
```
import { vuexfireMutations } from "vuexfire";

export const store = new Vuex.Store({
    state: {
        // Your state
    },
    getters: {
        // Your getters
    },
    mutations: {
        // Your mutations    
        mutations: vuexfireMutations
    },
    actions: {
        // Your actions
        setMenuRef: firestoreAction(context => {
            return context.bindFirestoreRef('menuItems', dbMenuRef);
        })
    }
})
```
Actions which bind your Firebase DB reference with your app's state property should be dispatched immediatelly after the app is created - `src/app.vue`:
```
export default {
    name: 'App',
    components: {
        Header
    },
    created() {
        this.$store.dispatch('setMenuRef', dbMenuRef);
    }
};
```