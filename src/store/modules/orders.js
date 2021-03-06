import { firestoreAction } from "vuexfire";
import { dbOrdersRef } from "../../firebase";

const state = {
    orders: []
};

const getters = {
    numberOfOrders: state => state.orders.length,
    getOrders: state => state.orders
};

const mutations = {
    createOrder: (state, orders) => state.orders.push(orders)
};

const actions = {
    setOrdersRef: firestoreAction(context => {
        return context.bindFirestoreRef('orders', dbOrdersRef.orderBy('createdAt', 'desc'));
    }),
    createOrder: async(context, order) => {
        try {
            await dbOrdersRef.add(order);
        } catch (err) {
            alert("Sorry, there was a problem placing your order, please try again.");
        }
    },
    removeOrder: async(context, id) => {
        try {
            await dbOrdersRef.doc(id).delete();

            alert("Order deleted.");
        } catch (err) {
            alert(`There was a problem removing order, ${err}`);
        }
    }
};

export default {
    state,
    mutations,
    getters,
    actions
}