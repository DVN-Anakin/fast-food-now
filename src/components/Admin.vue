<template>
    <div class="admin container-fluid my-5">
        <div class="admin__wrapper" v-if="currentUser !== null">

            <!-- Admin account info -->
            <div class="admin__current-user container text-left px-0 py-5 my-5">
                <p>Logged in as:</p> {{ currentUser }}
                <button type="button" class="btn btn-danger" @click.prevent="signOut">Sign out</button>
            </div>

            <!-- Orders section -->
            <div class="admin__orders text-left container px-0 py-5 my-5">
                <h3>Current orders ({{ numberOfOrders }}):</h3>
                <div class="admin__orders-wrap">
                    <div class="admin__order p-3" v-for="order in getOrders" :key="order.id">
                        <div class="row">
                            <div class="admin__order-id col-7">
                                <span><b>ID:</b> <i>{{ order.id }}</i></span>
                            </div>
                            <div class="admin__order-actions col-5 text-right">
                                <button type="button" class="btn btn-danger" title="Delete" @click="removeOrder(order.id)">&times;</button>
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
                                <div>{{ order.price | formatPrice }}</div>
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

            <!-- Adding new menu items -->
            <NewMenuItem />

            <!-- Editing menu items -->
            <div class="admin__menu text-left container px-0 py-5 my-5">
                <h3>MENU:</h3>
                <table class="table table-borderless" v-for="(itemType) in getMenuItems" :key="itemType.id">
                    <thead>
                        <tr>
                            <th colspan="2" class="align-middle">{{ itemType.type }}</th>
                            <th colspan="1" class="align-middle text-right">
                                <button type="button" class="btn btn-danger" title="Remove type" @click="removeItemType(itemType.id)">&times;</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody v-if="itemType.types.length > 0">
                        <tr v-for="(itemSubtype, index) in itemType.types" :key="index">
                            <td class="align-middle">{{ itemSubtype.name }}</td>
                            <td class="align-middle">{{ itemSubtype.price }}</td>
                            <td class="align-middle text-right">
                                <button type="button" class="btn btn-danger" title="Remove item" @click="removeItem(itemType.id, itemType.types[index])">&times;</button>
                                <button type="button" class="btn btn-warning" title="Edit">Edit</button>
                                <button v-if="itemSubtype.availability" type="button" class="btn btn-danger" title="Click to disable" @click="toggleItemAvailability(itemType.id, itemType.types[index], false)">Disable</button>
                                <button v-else type="button" class="btn btn-success" title="Click to enable" @click="toggleItemAvailability(itemType.id, itemType.types[index], true)">Enable</button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td class="align-middle">No {{ itemType.type.toLowerCase() }} added yet.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

        <!-- Login section -->
        <Login v-if="currentUser == null" />
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
            },
            async removeItemType(typeId) {
                this.$store.dispatch('removeItemType', typeId);
            },
            async removeItem(typeId, itemData) {
                this.$store.dispatch('removeItem', { typeId, itemData });
            },
            async toggleItemAvailability(typeId, itemData, setAvailability) {
                this.$store.dispatch('toggleItemAvailability', { typeId, itemData, setAvailability });
            },
            async removeOrder(id) {
                this.$store.dispatch('removeOrder', id);
            }
        },
        // beforeRouteLeave: (to, from, next) => {
        //     if (confirm("You'll be logged out when leaving admin. Continue?") == true) {
        //         this.$store.dispatch('signOut'); 
        //         next();
        //     } else { 
        //         next(false);
        //     } 
        // }
    };
</script>

<style scoped>
    .admin__menu table:nth-child(even) {
        background-color: #f9f9f9;
    }

    .admin__order {
        overflow-wrap: break-word;
    }

    .admin__order:nth-child(odd) {
        background-color: #f9f9f9;
    }

    .admin .btn {
        min-width: 35px;
        min-height: 35px;
        margin: 2.5px;
    }
</style>