<script setup lang="ts">

import Header from './components/Header.vue'
import Footer from './components/Footer.vue';

</script>

<template>
  <Header />
  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>
  <Footer />
</template>

<style scoped>

  main {
    width: 100%;
    height: calc(100vh - 110px);
    margin-top: 60px;
  }

  .container {
    max-width: 70%;
    margin: 0 auto;
    padding: 60px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .create-knight {
    width: 100px;
    height: 30px;
  }

  
</style>
