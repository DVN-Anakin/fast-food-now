<template>
    <div class="newMenuItem container text-left px-0 py-5 my-5">
        <!-- adding new menu item type -->
        <form id="new-menu-item-type" class="pb-5" @submit.prevent="addNewMenuItemType">
            <h3>New menu item type</h3>
            <div class="form-group">
                <label for="type-name">Type name <small><i>(e.g. Pizzas)</i></small>:</label>
                <input class="form-control" type="text" id="type-name" v-model="newMenuItemType.type" required />
            </div>
            <div class="form-group">
                <label for="type-description">Type description:</label>
                <textarea class="form-control" type="text" id="type-description" rows="3" v-model="newMenuItemType.description" required></textarea>
            </div>
            <button type="submit" class="btn btn-success">Add new type</button>
        </form>

        <!-- adding new menu item -->
        <form id="new-menu-item" @submit.prevent="addNewMenuItem">
            <h3>New menu item</h3>
            <div class="form-group">
                <label for="item-name">Item name <small><i>(e.g. Margherita 15")</i></small>:</label>
                <input class="form-control" type="text" id="item-name" v-model="newMenuItem.name" required />
            </div>
            <div class="form-group">
                <label for="item-description">Item description:</label>
                <textarea class="form-control" type="text" id="item-description" rows="3" v-model="newMenuItem.description" required ></textarea>
            </div>
            <div class="form-group">
                <label for="item-type">Item type <small><i>(e.g. Pizzas)</i></small>:</label>
                <select class="custom-select" id="item-type" v-model="newMenuItem.type" required >
                    <option value="">Select a type ...</option>
                    <option v-for="type in getMenuItemTypes" :value="type" :key="type">{{ type }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="item-price">Item price <small><i>(e.g. 3.99, 11.00)</i></small>:</label>
                <input class="form-control" type="number" id="item-price" v-model="newMenuItem.price" step=".01" required />
            </div>
            <button type="submit" class="btn btn-success">Add new item</button>
        </form>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        name: "NewMenuItem",
        data() {
            return({
                newMenuItemTypeFormErrors: [],
                newMenuItemFormErrors: [],
                menuItemTypeNames: [],
                newMenuItemType: {
                    type: "",
                    description: "",
                    types: []
                },
                newMenuItem: {
                    availability: false,
                    type: '',
                    name: '',
                    description: '', 
                    price: ''
                }
            });
        },
        computed: {
            ...mapGetters([
                'getMenuItemTypes',
                'getMenuItemsOfType',
                'getMenuItemTypesLC',
                'getMenuItemsOfTypeLC'
            ])
        },
        methods: {
            validateNewMenuItemType() { 
                this.newMenuItemTypeFormErrors = [];
                
                this.getMenuItemTypes.includes(this.newMenuItemType.type) && this.newMenuItemTypeFormErrors.push(`ERROR: Item type "${this.newMenuItemType.type}" already exists.`);
            },
            validateNewMenuItem() {
                this.newMenuItemFormErrors = [];
                
                this.getMenuItemsOfType(this.newMenuItem.type).includes(this.newMenuItem.name) && this.newMenuItemFormErrors.push(`ERROR: Item "${this.newMenuItem.name}" of type "${this.newMenuItem.type}" already exists.`);
            },
            async addNewMenuItemType() {
                this.validateNewMenuItemType();

                if (this.newMenuItemTypeFormErrors.length === 0) {
                    await this.$store.dispatch('addNewMenuItemType', this.newMenuItemType);

                    this.newMenuItemType.type = "";
                    this.newMenuItemType.description = "";
                } else {
                    alert(this.newMenuItemTypeFormErrors);
                }
            },
            async addNewMenuItem() {
                this.validateNewMenuItem();

                if (this.newMenuItemFormErrors.length === 0) {
                    await this.$store.dispatch('addNewMenuItem', this.newMenuItem);
                    
                    this.newMenuItem.name = "";
                    this.newMenuItem.description = "";
                    this.newMenuItem.price = "";
                    this.newMenuItem.type = "";
                } else {
                    alert(this.newMenuItemFormErrors);
                }
            }
        }
    };
</script>

<style scoped>
    .btn {
        margin: 5px 0;
    }

    .newMenuItem__type {
        margin: 0 0 20px;
    }
</style>