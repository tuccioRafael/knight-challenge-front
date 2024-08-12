<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer'
});
</script>

<template>
<footer class="footer">
      <p>&copy; 2024 RPG Character Tracker. Todos os direitos reservados.</p>
    </footer>
</template>

<style scoped>
.footer {
    width: 100%;
  background-color: #7159c1;
  bottom: 0;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: fixed;
}
</style>