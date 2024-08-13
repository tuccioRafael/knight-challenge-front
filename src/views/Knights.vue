<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import KnightTable from '../components/KnightTable.vue';
import { KnightType } from '../interfaces/knight.interface';
import { api } from '../network-service';

export default defineComponent({
  name: 'Knights',
  components: {
    KnightTable
  },
  setup() {
    const knights = ref<KnightType[]>([]);
    const title = ref('Lista de cavaleiros');
    const filterName = ref<'herói' | 'cavaleiro'>('herói');
    const filter = ref<boolean>(false);

    const handleFilter = async () => {
      filter.value = !filter.value;
      filterName.value = filter.value ? 'herói' : 'cavaleiro';
      const data = await api.get(`/knights?${filter.value ? 'filter=heroes': ''}`);
      knights.value = data.data;
    }

    onMounted(async() => {
      const data = await api.get('/knights');
      knights.value = data.data;
    });

    return {
      knights,
      title, 
      filterName,
      handleFilter
    };
  }
});
</script>

<template>
  <div class="title-header">
    <h2>{{ filterName === 'herói'? 'Lista de heróis' : 'Lista de cavaleiros' }}</h2>
    <button @click="() => handleFilter()">filtrar por {{ filterName }}</button>
  </div>
  <section>
    <KnightTable :knights="knights"/>
  </section>
</template>

<style scoped>
.title-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  padding: 10px 15px;
  background: #7159c1;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

section {
  width: 100%;
  padding: 20px;
}
</style>
