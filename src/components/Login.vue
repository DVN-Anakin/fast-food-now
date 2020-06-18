<template>
    <div class="login text-left container px-0 py-5 my-5">
        <form>
            <h2>Login</h2>
            <div class="form-group">
                <label for="email">E-mail:</label>
                <input class="form-control" type="email" id="email" placeholder="Enter e-mail" v-model="email" />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input class="form-control" type="password" id="password" placeholder="Enter password" v-model="password" />
            </div>
            <button type="button" class="btn btn-success" @click.prevent="signIn">Sign in</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            signIn() {
                const user = {
                    email: this.email,
                    password: this.password
                };
                // Calling (dispatching) a signIn action which is declared in $store and which commits the final mutation
                this.$store.dispatch('signIn', user);
            }
        }
    }
</script>