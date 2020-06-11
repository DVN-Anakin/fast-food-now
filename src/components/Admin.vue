<template>
    <div class="admin container-fluid">
        <div class="admin__current-user container text-left">
            <p>Logged in as:</p> {{ currentUser }}
            <button type="button" class="btn btn-danger" @click.prevent="signOut">Sign out</button>
        </div>

        <!-- Adding new menu items -->
        <NewMenuItem />

        <!-- Removing added menu items -->
        <div class="admin__menu text-left container">
            <h3>MENU:</h3>
            <table class="table" v-for="(itemType) in getMenuItems" :key="itemType.id">
                <thead>
                    <tr>
                        <th colspan="3">{{ itemType.type }}</th>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Delete</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody v-for="(itemSubtype) in itemType.types" :key="itemSubtype.id">
                    <tr>
                        <td>{{ itemSubtype.name }}</td>
                        <td>{{ itemSubtype.price }}</td>
                        <td>
                            <button type="button" class="btn btn-danger">&times;</button>
                        </td>
                        <td>
                            <button v-if="itemSubtype.availability" type="button" class="btn btn-danger" @click="disableMenuItem(itemSubtype)">Disable</button>
                            <button v-else type="button" class="btn btn-success" @click="enableMenuItem(itemSubtype)">Enable</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Orders section -->
        <div class="admin__orders text-left container p-0">
            <h3>Current orders ({{ numberOfOrders }}):</h3>
            <div class="admin__orders-wrap">
                <div class="admin__order p-3" v-for="order in getOrders" :key="order.id">
                    <div class="row">
                        <div class="admin__order-id col-7">
                            <span><b>ID:</b> <i>{{ order.id }}</i></span>
                        </div>
                        <div class="admin__order-actions col-5 text-right">
                            <button type="button" class="btn btn-danger" title="Delete">&times;</button>
                            <button type="button" class="btn btn-warning" title="Edit">&#8629;</button>
                            <button type="button" class="btn btn-success">&#10004;</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="admin__order-created col-12"><b>Ordered:</b> <i>{{ order.createdAt | dateTime }}</i></div>
                    </div>
                    <div class="row">
                        <div class="order__items col-8">
                            <div><b>Items ({{ Object.keys(order.items).length }}):</b></div>
                            <div class="order__items-list" v-for="orderItem in order.items" :key="orderItem.id">
                                <div class="order__item">&#9658;&nbsp;{{ orderItem.quantity }}&nbsp;&times; {{ orderItem.type }} - {{ orderItem.name }}</div>
                            </div>
                        </div>
                        <div class="order__price col-4 text-right">
                            <div><b>Price:</b></div>
                            <div>$300.00</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 order__customer">
                            <div><b>Customer:</b></div>
                            <div>Sherlock Holmes, 221B Baker Street, London</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 order__notes">
                            <div><b>Notes:</b></div>
                            <div>Please no onions</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Login section -->
        <Login />
    </div>
</template>

<script>
    import NewMenuItem from "./NewMenuItem";
    import Login from "./Login";
    import { mapGetters } from "vuex";

    export default {
        name: "admin",
        components: {
            NewMenuItem,
            Login
        },
        // data() {
        //     return ({
        //         name: "Anakin"
        //     })
        // },
        // // Component navigation guard example
        // beforeRouteEnter(to, from, next) {
        //     next(vueModel => {
        //         alert(`Hi, ${vueModel.name}`);
        //     })
        // },
        computed: {
            // // Using vuex getters without mapping - confusing with many getters
            // getMenuItems() {
            //     return this.$store.getters.getMenuItems;
            // },
            // numberOfOrders() {
            //     return this.$store.getters.numberOfOrders;
            // },
            // currentUser() {
            //     return this.$store.getters.currentUser;
            // }

            // // Using vuex getters with mapping - organized approach
            ...mapGetters([
                'getMenuItems',
                'numberOfOrders',
                'getOrders',
                'currentUser'
            ])
        },
        methods: {
            disableMenuItem(item) {
                item.availability = false; console.log('disableMenuItem', this.$store.state.menuItems);
            },
            enableMenuItem(item) {
                item.availability = true; console.log('enableMenuItem', this.$store.state.menuItems);
            },
            async signOut() {
                this.$store.dispatch('signOut');
            }
        }  
    };
</script>

<style scoped>
    .admin__order {
        overflow-wrap: break-word;
    }

    .admin__order:nth-child(odd) {
        background-color: #f9f9f9;
    }

    .admin__order .btn {
        width: 35px;
        height: 35px;
        margin: 2.5px;
    }
</style>