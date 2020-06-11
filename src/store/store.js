import Vue from "vue";
import Vuex from "vuex";
import menu from "./modules/menu";
import users from "./modules/users";
import orders from "./modules/orders";
import { vuexfireMutations } from "vuexfire";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        menu,
        users,
        orders
    },
    mutations: vuexfireMutations
});