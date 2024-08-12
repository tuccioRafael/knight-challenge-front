<!-- <script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'Header',
  components: {
    RouterLink
  }
});
</script>


<template>
    <nav>
    <RouterLink class="link" to="/">Home</RouterLink>
    <RouterLink class="link" to="/knights">Knights</RouterLink> 
    <RouterLink class="link" to="/knights-create">Adicionar</RouterLink>
  </nav>
</template>
<style scoped>

nav {
  height: 60px;
  background: #7159c1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
.link {
  width: 100px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  height: 45px;
  text-align: center;
  line-height: 45px;
  text-decoration: none;

}

</style> -->
<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'Header',
  components: {
    RouterLink
  }
});
</script>


<template>
    <header class="header">
      <h1>Ficha Técnica RPG</h1>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/knights">Personagens</router-link></li>
          <li><router-link to="/knights-create">Criar Personagem</router-link></li>
        </ul>
      </nav>
    </header>

</template>
<style scoped>
.header {
  background-color: #7159c1;
  color: #fff;
  padding: 10px;
  text-align: center;
}

.header nav ul {
  list-style: none;
  padding: 0;
}

.header nav ul li {
  display: inline;
  margin: 0 10px;
}

.header nav ul li a {
  color: #fff;
  text-decoration: none;
}


</style>



