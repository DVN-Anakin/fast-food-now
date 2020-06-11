<template>
  <div id="app">
    <Header />
    <router-view></router-view>    
    <div class="info container">
      <div class="row">
        <div class="col-lg-4">
          <router-view name="ordering-guide"></router-view>
        </div>
        <div class="col-lg-4">
          <router-view name="delivery"></router-view>
        </div>
        <div class="col-lg-4">
          <router-view name="history"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header';
  import { dbMenuRef } from './firebase';
  import { dbOrdersRef } from './firebase';

  export default {
    name: 'App',
    components: {
      Header
    },
    created() {
      this.$store.dispatch('setMenuRef', dbMenuRef);
      this.$store.dispatch('setOrdersRef', dbOrdersRef);
    }
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
