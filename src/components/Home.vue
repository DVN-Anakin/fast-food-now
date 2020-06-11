<template>
    <div class="jumbotron text-center">
        <h1 class="display-4">Welcome to Fast Food Now!</h1>
        <img src="../assets/img/logo.png" height="150">
        <p class="lead">We make pizzas, burgers, Tacos, sandwiches, fries, baguettes, noodles and much more.</p>
        <hr class="my-4">
        <p>Feeling hungry?</p>
        <p class="lead">
            <router-link tag="button" :to="{ name: 'menuLink' }" class="btn btn-primary btn-lg" role="button">Let's order!</router-link>
        </p>
    </div>
</template>

<script>
    export default {
        name: "Home" 
    }
</script>

<style scoped>
    .jumbotron img {
        padding: 0 0 20px 0;
    }
</style>