<template>
    <div class="menu container py-2 py-lg-2 px-0 my-0">
        <div class="row">
            <div class="menu__list col-md-8 py-5 py-md-5">
                <h3>~ Menu ~</h3>            
                <table class="table table-borderless mt-5 mb-10" v-for="item in getMenuItems" v-bind:key="item.id">
                    <tbody>
                        <tr>
                            <td colspan="3">
                                <h5><strong>{{ item.type }}</strong></h5>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <i>{{ item.description }}</i>
                            </td>
                        </tr>
                        <tr v-for="(option) in item.types.filter(item => item.availability === true)" v-bind:key="option.id">
                            <td class="text-left align-middle"><strong>{{ option.name }}</strong><br><small><i>{{ option.description }}</i></small></td>
                            <td class="align-middle text-right">{{ option.price | formatPrice }}</td>
                            <td class="align-middle text-right">
                                <button type="button" class="btn btn-success" @click="addToBasket(item, option)">+</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="menu__basket col-md-4 py-5 py-md-5 bg-light">
                <h3>Basket</h3>
                <div class="menu__basket-content" v-if="basket.length > 0">
                    <table class="table table-borderless">
                        <tbody>
                            <tr v-for="(basketItem, index) in basket" v-bind:key="basketItem[index]">
                                <td class="align-middle">
                                    <div class="row">
                                        <div class="col-12 text-left">{{ basketItem.type }} - {{ basketItem.name }}</div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-12 text-left">{{ basketItem.price * basketItem.quantity | formatPrice }}</div>
                                    </div>
                                </td>
                                <td class="menu__basket-counter align-middle">
                                    <button class="btn btn-success menu__basket-count-btn" @click="increaseQuantity(basketItem)">+</button>
                                    <span class="d-block">{{ basketItem.quantity }} &times;</span>
                                    <button class="btn btn-danger menu__basket-count-btn" @click="decreaseQuantity(basketItem)">-</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="menu__basket-total">Order total: <strong>{{ totalPrice | formatPrice }}</strong></p>
                    <button class="btn btn-success" @click="createOrder">Order</button>
                </div>
                <div class="menu__basket-content" v-else>
                    <p>{{ basketText }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        name: "Menu",
        data() {
            return {
                basket: [],
                basketText: "Your basket is empty."
            }
        },
        computed: {
            // // Using vuex getters without mapping - confusing with many getters
            // getMenuItems() {
            //     return this.$store.getters.getMenuItems;
            // }

            // // Using vuex getters with mapping - organized approach
            ...mapGetters([
                'getMenuItems'
            ]),

            totalPrice() {
                let totalCost = 0;

                this.basket.map(item => {
                    totalCost += item.quantity * item.price;
                });

                return totalCost;
            }
        },
        methods: {
            roundNumberTo(n, digits) {
                var negative = false;
                if (digits === undefined) {
                    digits = 0;
                }
                if( n < 0) {
                    negative = true;
                    n = n * -1;
                }
                var multiplicator = Math.pow(10, digits);
                n = parseFloat((n * multiplicator).toFixed(11));
                n = (Math.round(n) / multiplicator).toFixed(2);
                if(negative) {    
                    n = (n * -1).toFixed(2);
                }
                return n;
            },
            async addToBasket(item, option) {
                const itemAlreadyInBasket = await this.basket.find(
                    basketItem => basketItem.type === item.type && basketItem.name === option.name
                );

                if (itemAlreadyInBasket) {
                    itemAlreadyInBasket.quantity++;
                    return;
                } 

                this.basket.push({
                    type: item.type,
                    price: option.price,
                    name: option.name,
                    quantity: 1
                });
            },
            removeFromBasket(item) {
                this.basket.splice(this.basket.indexOf(item), 1);
            },
            decreaseQuantity(item) {
                item.quantity--;
                
                if (item.quantity === 0) {
                    this.removeFromBasket(item);
                }
            },
            increaseQuantity(item) {
                item.quantity++;
            },
            createOrder() {
                const order = {
                    items: { ...this.basket },
                    createdAt: new Date(),
                    price: this.totalPrice
                };
                this.$store.dispatch('createOrder', order);
                this.basket = [];
                this.basketText = "Thank You, your order has been placed."
            }
        }
    };
</script>

<style scoped>
    .menu__basket-counter {
        width: 60px;
    }

    .menu__basket-count-btn {
        margin: 5px 0;
        width: 36px;
        height: 36px;
    }
</style>