<template>
    <div class="newMenuItem container text-left">
        <!-- adding new menu item type -->
        <form id="new-menu-item-type">
            <h3>New menu item type</h3>
            <div class="form-group">
                <label for="type-name">Type name <small><i>(e.g. Pizza)</i></small>:</label>
                <input class="form-control" type="text" id="type-name" v-model="newMenuItemType.type" />
            </div>
            <div class="form-group">
                <label for="type-description">Type description:</label>
                <textarea class="form-control" type="text" id="type-description" rows="3" v-model="newMenuItemType.description"></textarea>
            </div>
            <button type="submit" class="btn btn-success" @click.prevent="addNewMenuItemType">Add new type</button>
        </form>

        <!-- adding new menu item -->
        <form id="new-menu-item">
            <h3>New menu item</h3>
            <div class="form-group">
                <label for="item-name">Item name <small><i>(e.g. Margherita 15")</i></small>:</label>
                <input class="form-control" type="text" id="item-name" v-model="newMenuItem.name" />
            </div>
            <div class="form-group">
                <label for="item-description">Item description:</label>
                <textarea class="form-control" type="text" id="item-description" rows="3" v-model="newMenuItem.description"></textarea>
            </div>
            <div class="form-group">
                <label for="item-type">Item type <small><i>(e.g. Pizza)</i></small>:</label>
                <select class="custom-select" id="item-type" v-model="newMenuItem.type">
                    <option value="">Select a type ...</option>
                    <option v-for="type in getMenuItemTypes" :value="type" :key="type">{{ type }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="item-price">Item price <small><i>(e.g. 3.99, 11.00)</i></small>:</label>
                <input class="form-control" type="number" id="item-price" v-model="newMenuItem.price" />
            </div>
            <button type="submit" class="btn btn-success" @click.prevent="addNewMenuItem">Add new item</button>
        </form>

        <form>
            <h3>Menu</h3>
            <div class="newMenuItem__types">
                <div class="newMenuItem__type" v-for="(newMenuItemType, index) in newMenuItem.types" v-bind:key="index">
                    <p><strong>Type {{ index + 1 }}:</strong></p>
                    <div class="form-group">
                        <label :for="'newMenuItem__type-name-' + (index + 1)">Type {{ index + 1 }} - Name:</label>
                        <input class="form-control" type="text" :id="'newMenuItem__typeName-' + (index + 1)" v-model="newMenuItem.types[index].type" />
                    </div>
                    <div class="form-group">
                        <label :for="'newMenuItem__type-price-' + (index + 1)">Type {{ index + 1 }} - Price:</label>
                        <input class="form-control" type="number" min="0" max="1000" step=".01" :id="'newMenuItem__type-price-' + (index + 1)" v-model="newMenuItem.types[index].price" />
                    </div>
                    <div class="form-group">
                        <label :for="'newMenuItem__type-desc-' + (index + 1)">Type {{ index + 1 }} - Description:</label>
                        <textarea class="form-control" type="text" :id="'newMenuItem__type-desc-' + (index + 1)" rows="3"></textarea>
                    </div>
                </div>
            </div>
            <br />
            <button type="submit" class="btn btn-success" @click.prevent="validateNewMenuItemType">Add meal</button>
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