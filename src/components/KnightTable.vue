<script lang="ts">
import { defineComponent } from 'vue';
import { KnightType } from '../interfaces/knight.interface';
import { calcAge, calcXp, calcAttack } from '../utils/ultils';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "KnightTable",
  props: {
    knights: {
      type: Array as () => KnightType[],

    },
  },
  setup() {

    const router = useRouter();
    const calculateAge = calcAge;
    const calculateXp = calcXp;
    const calculateAttack = calcAttack;
    return {
      calculateAge,
      calculateXp,
      calculateAttack,
      router,
    }
  }

})
</script>


<template>
  <section>
    <table v-if="knights?.length">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Idade</th>
          <th>Armas</th>
          <th>Attributo</th>
          <th>Ataque</th>
          <th>Exp</th>
          <th>action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="knight in knights" :key="knight._id">
          <td :id="`knight-name-${knight._id}`">{{ knight.name }}</td>
          <td :id="`knight-age-${knight._id}`">{{ calculateAge(new Date(knight.birthday)) }}</td>
          <td :id="`knight-weapons-${knight._id}`">{{ knight.weapons.length }}</td>
          <td :id="`knight-keyAttribute-${knight._id}`">{{ knight.keyAttribute }}</td>
          <td :id="`knight-attack-${knight._id}`">{{ calculateAttack(knight) }}</td>
          <td :id="`knight-exp-${knight._id}`">{{ calculateXp(new Date(knight.birthday)) }}</td>
          <td>
            <RouterLink :to="`/knights/${knight._id}`">Ficha</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="knights-empty">
      <p >Nenhum cavaleiro encontrado</p>
      <p >Crie um novo Cavaleiro</p>
      <button id="route" @click="() => router?.push('/knights-create')">Cariar</button>
    </div>
  </section>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  width: 180px;
  padding: 18px;
  font-size: 18px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  color: #333;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f5f5f5;
}

.knights-empty {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.knights-empty p {
  font-size: 20px;
  color: #7159c1;
}	

.knights-empty button {
  width: 150px;
  padding: 10px 15px;
  background: #7159c1;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

}

</style>