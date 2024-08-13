<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { KnightType } from '../interfaces/knight.interface';
import { api } from '../network-service';
import { useRoute, useRouter } from 'vue-router';
import { calcAge, calcAttack, calcXp, formatDate } from '../utils/ultils';
import Alert from '../components/Alert.vue';
import Dialog from '../components/Dialog.vue';

export default defineComponent({
  name: 'KnightInfo',
  components: {
    Alert,
    Dialog
  },
  setup() {
    const router = useRouter();
    const knight = ref<KnightType | null>(null);
    const route = useRoute();
    const id = route.params.id as string;


    const handleBecomeHero = async () => {
      openAlertHero.value = true;
      // openAlertError.value = true;
    };

    const handleEditNickname = async () => {
      openAlertEdit.value = true;
    };

    const handleConfirmEdit = async () => {
      try {
        router.push(`/knights-edit/${id}`);
      } catch (error) {
        console.error(error);
      }
    };

    const handleConfirmBecomeHero = async () => {
      try {
        await api.delete(`/knights/${id}`);
        router.push('/knights');
      } catch (error) {
        errorMessage.value = 'Ocorreu um erro ao tornar o cavaleiro um herói.';
        openAlertError.value = true;
        console.error(error);
      }
    }
    const handleCancelEdit = () => {
      openAlertEdit.value = false;
    }

    const handleCancelHero = () => {
      openAlertHero.value = false;
    }

    onMounted(async () => {
      try {
        const data = await api.get(`/knights/${id}`);
        knight.value = data.data;
      } catch (error) {
        errorMessage.value = 'Ocorreu um erro ao carregar o cavaleiro.';
        openAlertError.value = true;
        console.error(error);
      }
    
    });

    const calculateAge = calcAge;
    const calculateXp = calcXp;
    const calculateAttack = calcAttack;
    const formatBirthday = formatDate;
    const openAlertEdit = ref(false);
    const openAlertHero = ref(false);
    const openAlertError = ref(false);
    const errorMessage = ref('');

    watch(openAlertError, (value) => {
      if (value) {
        setTimeout(() => {
          openAlertError.value = false;
        }, 4000);
      }
    });

    return {
      knight,
      id,
      calculateAge,
      calculateXp,
      calculateAttack,
      formatBirthday,
      handleBecomeHero,
      handleEditNickname,
      openAlertEdit,
      handleConfirmEdit,
      openAlertHero,
      handleConfirmBecomeHero,
      handleCancelHero,
      handleCancelEdit,
      openAlertError,
      errorMessage
    };
  }
});
</script>

<template>
  <div class="title-header">
    <h3>Ficha técnica</h3>
    <div>
      <span @click="handleEditNickname" class="btn-update">Editar apelido</span>
      <button @click="handleBecomeHero">Tornar herói</button>
    </div>
  </div>
  <section v-if="knight">
    <div class="content">
      <section>
        <p class="title-details">Cavaleiro</p>
        <ul class="knight-details">
          <li>
            <p>Nome:</p>
            <strong>{{ knight.name }}</strong>
          </li>
          <li>
            <p>Apelido:</p>
            <strong>{{ knight.nickname }}</strong>
          </li>
          <li>
            <p>Nascimento:</p>
            <strong>{{ formatBirthday(new Date(knight.birthday)) }}</strong>
          </li>
          <li>
            <p>Idade:</p>
            <strong>{{ calculateAge(new Date(knight.birthday)) }}</strong>
          </li>
          <li>
            <p>Quantidade de armas:</p>
            <strong>{{ knight?.weapons.length }}</strong>
          </li>
          <li>
            <p>Atributo chave:</p>
            <strong>{{ knight.keyAttribute }}</strong>
          </li>
          <li>
            <p>Ataque:</p>
            <strong>{{ calculateAttack(knight) }}</strong>
          </li>
          <li>
            <p>Exp:</p>
            <strong>{{ calculateXp(new Date(knight.birthday)) }}</strong>
          </li>
        </ul>
      </section>
      <section>
        <p class="title-details">Atributos</p>
        <ul class="attributes-details" v-if="knight">
          <li>
            <p>Força:</p>
            <strong>{{ knight.attributes.strength }}</strong>
          </li>
          <li>
            <p>Destreza:</p>
            <strong>{{ knight.attributes.dexterity }}</strong>
          </li>
          <li>
            <p>Constituição:</p>
            <strong>{{ knight.attributes.constitution }}</strong>
          </li>
          <li>
            <p>Inteligência:</p>
            <strong>{{ knight.attributes.intelligence }}</strong>
          </li>
          <li>
            <p>Sabedoria:</p>
            <strong>{{ knight.attributes.wisdom }}</strong>
          </li>
          <li>
            <p>Carisma:</p>
            <strong>{{ knight.attributes.charisma }}</strong>
          </li>
        </ul>
      </section>

      <section>
        <p class="title-details">Armas</p>
        <ul class="weapons" v-if="knight">
          <li v-for="weapon in knight.weapons">
            <ul class="weapon-details">
              <li>
                <p>Nome:</p>
                <strong>{{ weapon.name }}</strong>
              </li>
              <li>
                <p>Modificador:</p>
                <strong>{{ weapon.mod }}</strong>
              </li>
              <li>
                <p>Atributo:</p>
                <strong>{{ weapon.attr }}</strong>
              </li>
              <li>
                <p>Equipado:</p>
                <strong>{{ weapon.equipped ? 'Sim' : 'Não' }}</strong>
              </li>
              <hr>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  </section>
  <p v-else>Carregando...</p>
  <!-- Alerta para editar apelido -->
  <Dialog type="warning" :hasExtra="true" :onConfirm="handleConfirmEdit" :open="openAlertEdit"
    message="Você tem certeza que deseja editar este cavaleiro?" :onCancel="handleCancelEdit"/>
  
  <!-- Alerta para tornar herói -->
  <Dialog type="warning" :hasExtra="true" :onConfirm="handleConfirmBecomeHero" :open="openAlertHero"
    message="Você tem certeza que deseja tornar este cavaleiro um herói?" :onCancel="handleCancelHero"/>
  
  <!-- Alerta para erros -->
  <Alert v-if="openAlertError" type="error" :open="openAlertError" :message="errorMessage"/>

</template>

<style scoped>
.btn-update {
  color: #7159c1;
  cursor: pointer;
}

.content {
  width: 100%;
  padding: 20px;
  display: flex;
  gap: 20px;
}

button {
  padding: 10px 15px;
  background: #7159c1;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.title-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-header div {
  display: flex;
  gap: 20px;
  align-items: center;
}

.title-details {
  font-size: 18px;
  font-weight: bold;
}

.weapons,
.attributes-details,
.knight-details {
  width: 500px;
  min-height: 460px;
  border: 1px solid #7159c1;
  border-radius: 10px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.weapon-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: space-between;
}

.weapon-details li p,
.weapon-details li strong {
  font-size: 14px;
}


li {
  display: flex;
  justify-content: space-between;
  gap: 30px
}

li p,
li strong {
  font-size: 18px;
}
</style>
