<script lang="ts">
import { defineComponent, ref } from 'vue';
import { WeaponType } from '../interfaces/knight.interface';



export default defineComponent({
  name: 'WeaponForm',
  props: {
    getWeapons: {
      type: Function as unknown as () => (weapon: Omit<WeaponType, 'mod'>) => void,
      required: true,
    },
    cancelWeaponForm: {
      type: Function as unknown as () => () => void,
      required: true,
    }
  },
  setup(props) {
    const { getWeapons } = props;
    const form = ref<Omit<WeaponType, '_id' | 'mod'>>({
      name: '',
      attr: '',
      equipped: false,
    });
    const submitForm = async () => {
      try {
        getWeapons({
          _id: new Date().getTime().toString(),
          name: form.value.name, 
          attr: form.value.attr, 
          equipped: true,
        });
      } catch (error) {
        console.error('Erro ao criar cavaleiro:', error);
      }
    };

    const cancelForm = () => {
      props.cancelWeaponForm();
    }

    return {
      form,
      getWeapons,
      submitForm,
      cancelForm,
    };
  },
});
</script>

<template>
  <h3>Weapons</h3>
  <form @submit.prevent="submitForm">
    <div class="weapon-form">
      <div class="form-group">
        <label for="name">Nome:</label>
        <input v-model="form.name" type="text" id="name" required />
      </div>
      <div class="form-group">
        <label for="keyAttribute">Atributo:</label>
        <select v-model="form.attr" id="keyAttribute" required>
          <option value="strength">Força</option>
          <option value="dexterity">Destreza</option>
          <option value="constitution">Constituição</option>
          <option value="intelligence">Inteligência</option>
          <option value="wisdom">Sabedoria</option>
          <option value="charisma">Carisma</option>
        </select>
      </div>
      
    </div>
    <div class="btn-group">
      <button>Adicionar</button>
      <button id="cancel" @click="cancelForm">cancel</button>
    </div>
  </form>
</template>

<style scoped>

.btn-group {
  display: flex;
  gap: 10px;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 10px;
}


.weapon-form {
  width: 30%;
  border: 1px solid #7159c1;
  border-radius: 10px;
  padding: 20px;
  margin: 30px 0;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  height: 45px;
  width: 100%;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #7159c1;
}

button {
  padding: 10px 15px;
  background: #7159c1;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #5a4aa5;
}


.form-group input:focus,
.form-group select:focus {
  border: 1px solid #5a4aa5;
  box-shadow: 0px 0px 5px 0px #5a4aa5;
}
</style>