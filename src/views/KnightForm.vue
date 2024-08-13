<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { AttributesType, KnightType, WeaponType } from '../interfaces/knight.interface';
import { api } from '../network-service';
import { useRoute, useRouter } from 'vue-router';
import WeaponForm from '../components/WeaponForm.vue';
import Weapon from '../components/Weapon.vue';
import { calcModWeapon } from '../utils/ultils';
import { Attributes } from '../emums';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Alert from '../components/Alert.vue';

export default defineComponent({
  name: 'CreateKnight',
  components: {
    WeaponForm,
    Weapon,
    Alert,
  },
  setup() {
    const route = useRoute(); // Acessando a rota
    const id = route?.params?.id as string;

    const alertErrorMessage = ref('Erro no servidor');
    const alertErrorOpen = ref(false);
    const disable = ref(false);
    const disableSubmit = ref(true);
    const disableAttr = ref(true);
    const attributeMessage = ref('Você precisa ter mais de 7 anos para começar o treinamento');

    const knight = ref<KnightType | null>(null);
    dayjs.extend(utc);
    dayjs.extend(timezone);


    const weapons = ref<Omit<WeaponType, 'mod'>[]>([]);
    const openWeaponForm = ref(false);
    const router = useRouter();
    const form = ref<Omit<KnightType, '_id' | 'weapons'>>({
      name: '',
      birthday: '',
      nickname: '',
      keyAttribute: '',
      attributes: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
      }
    });

    const validateNonNegative = (value: number) => {
      return Math.max(0, value);
    };

    const handleAttributeChange = (key: keyof AttributesType, event: Event) => {
      const target = event.target as HTMLInputElement; // Tipo de verificação
      if (target) {
        const value = target.valueAsNumber;
        form.value.attributes[key] = validateNonNegative(value);
      }
    };

    const addWeapon = (weapon: Omit<WeaponType, 'mod'>) => {
      if (weapon.equipped) {
        weapons.value = weapons.value.map(w => ({
          ...w,
          equipped: false
        }));
        weapons.value.push(weapon);
      } else {
        weapons.value.push(weapon);
      }
      openWeaponForm.value = false;
      disableSubmit.value = false;
    };

    const equipWeapon = (id: string) => {
      weapons.value = weapons.value.map((weapon) => ({
        ...weapon,
        equipped: weapon._id === id
      }));
    };

    const submitForm = async () => {
      try {
        weapons.value ? disable.value = false : disable.value = true;
        const values = {
          ...form.value,
          weapons: weapons.value.map((weapon) => ({
            name: weapon.name,
            attr: weapon.attr,
            mod: calcModWeapon(weapon.attr as Attributes, form.value.attributes),
            equipped: weapon.equipped,
          })),
          attributes: form.value.attributes,
        }
        if(id) {
          await api.put(`/knights/${id}`, values);
          router.push('/knights');
          return;
        }
        await api.post('/knights', values);
        router.push('/knights');
      } catch (error) {
        alertErrorOpen.value = true;
        alertErrorMessage.value = 'Erro ao criar cavaleiro';
        console.error('Erro ao criar cavaleiro:', error);
      }
    };

    const closeWeaponForm = () => {
      openWeaponForm.value = false;
    };

    const validateBirdthday = () => {
      const brazilTime = dayjs().tz('America/Sao_Paulo');
      return brazilTime.format('YYYY-MM-DD');
    }

    onMounted(async() => {
      if (id) {
        try {
          const { data } = await api.get(`/knights/${id}`);
          disable.value = true;
          disableSubmit.value = false;
          knight.value = data;
          form.value = {
            name: data.name,
            birthday: dayjs(data.birthday).add(1, 'day').format('YYYY-MM-DD'),
            nickname: data.nickname,
            keyAttribute: data.keyAttribute,
            attributes: {
              strength: data.attributes.strength,
              dexterity: data.attributes.dexterity,
              constitution: data.attributes.constitution,
              intelligence: data.attributes.intelligence,
              wisdom: data.attributes.wisdom,
              charisma: data.attributes.charisma,
            }
          };
          weapons.value = data.weapons;
        } catch (error) {
          alertErrorMessage.value = 'Erro ao carregar os dados do cavaleiro';
          alertErrorOpen.value = true;
          console.error('Erro ao carregar os dados do cavaleiro:', error);
        }
      }
    });

    watch(alertErrorOpen, (value) => {
      if (value) {
        setTimeout(() => {
          alertErrorOpen.value = false;
        }, 4000);
      }
    });

    const  isItOldEnoughToStartTraining = (birthday: Date): boolean => {
      const sevenYearsAgo = dayjs().subtract(7, 'year').startOf('day');
      const birthDate = dayjs(birthday).startOf('day');
      return birthDate.isAfter(sevenYearsAgo);
    };

    const handleBirthdayChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target) {
        const birthday = new Date(target.value);
        if (isItOldEnoughToStartTraining(birthday)) {
          disableAttr.value = true;
        } else {
          disableAttr.value = false;
        }
      }
    };

    return {
      form,
      submitForm,
      weapons,
      openWeaponForm,
      addWeapon,
      equipWeapon,
      closeWeaponForm,
      handleAttributeChange,
      maxDate: validateBirdthday(),
      disable,
      disableSubmit,
      handleBirthdayChange,
      disableAttr,
      attributeMessage,
      id,
      alertErrorMessage,
      alertErrorOpen,
    };
  },
});
</script>


<template>
  <h3>Cavaleiro</h3>
  <div class="form-container">
    <form @submit.prevent="submitForm">

      <div class="form-group">
        <label for="name">Nome:</label>
        <input v-model="form.name" type="text" id="name" required :disabled="disable" />
      </div>

      <div class="form-group">
        <label for="birthday">Data de Nascimento:</label>
        <input 
          v-model="form.birthday" 
          type="date" id="birthday" 
          :max="maxDate" required 
          :disabled="disable"
          @blur="handleBirthdayChange($event)"
        />
      </div>

      <div class="form-group">
        <label for="nickname">Apelido:</label>
        <input v-model="form.nickname" type="text" id="nickname" required />
      </div>

      <div class="form-group">
        <label for="keyAttribute">Atributo Principal:</label>
        <select v-model="form.keyAttribute" id="keyAttribute" required :disabled="disable">
          <option value="strength">Força</option>
          <option value="dexterity">Destreza</option>
          <option value="constitution">Constituição</option>
          <option value="intelligence">Inteligência</option>
          <option value="wisdom">Sabedoria</option>
          <option value="charisma">Carisma</option>
        </select>
      </div>

      <p class="attr-mensage">{{ disableAttr && !id ? attributeMessage : '' }}</p>
      <div class="attributes">
        <div class="form-group">
          <label for="strength">Força:</label>
          <input v-model.number="form.attributes.strength" type="number" id="strength"
          :disabled="disableAttr"
            @input="handleAttributeChange('strength', $event)" />
        </div>
        <div class="form-group">
          <label for="dexterity">Destreza:</label>
          <input v-model.number="form.attributes.dexterity" type="number" id="dexterity"
          :disabled="disableAttr"
            @input="handleAttributeChange('dexterity', $event)" />
        </div>
        <div class="form-group">
          <label for="constitution">Constituição:</label>
          <input v-model.number="form.attributes.constitution" type="number" id="constitution"
          :disabled="disableAttr"
            @input="handleAttributeChange('constitution', $event)" />
        </div>
        <div class="form-group">
          <label for="intelligence">Inteligência:</label>
          <input v-model.number="form.attributes.intelligence" type="number" id="intelligence"
          :disabled="disableAttr"
            @input="handleAttributeChange('intelligence', $event)" />
        </div>
        <div class="form-group">
          <label for="wisdom">Sabedoria:</label>
          <input v-model.number="form.attributes.wisdom" type="number" id="wisdom"
          :disabled="disableAttr"
            @input="handleAttributeChange('wisdom', $event)" />
        </div>
        <div class="form-group">
          <label for="charisma">Carisma:</label>
          <input v-model.number="form.attributes.charisma" type="number" id="charisma"
          :disabled="disableAttr"
            @input="handleAttributeChange('charisma', $event)" />
        </div>
      </div>

      <div v-if="openWeaponForm">
        <WeaponForm :getWeapons="addWeapon" :cancelWeaponForm="closeWeaponForm" />
      </div>

      <div class="weapons">
        <button type="button" class="btn-add-weapon" @click="openWeaponForm = true" :disabled="disable">Adicionar arma</button>
        <div v-for="weapon in weapons" :key="weapon._id">
          <Weapon :name="weapon.name" :attr="weapon.attr" :equipped="weapon.equipped" :_id="weapon._id"
            :equipWeapon="equipWeapon" />
        </div>
      </div>

      <button class="btn" :disabled="disableSubmit" type="submit">Criar Cavaleiro</button>
      <Alert :message="alertErrorMessage" :open="alertErrorOpen" type="error" position='top-center' />
    </form>
  </div>
</template>


<style scoped>
.attributes {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.weapons {
  width: 100%;
  display: flex;
  margin-top: 20px;
  gap: 20px;
}

.btn-add-weapon {
  font-size: 16px;
  color: #7159c1;
  background: none;
  cursor: pointer;
  width: 150px;
  height: 40px;
  border: none;
  margin-bottom: 20px;
}

.btn-add-weapon:disabled {
  color: #d0d0d0;
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
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #7159c1;
}

.btn {
  padding: 10px 15px;
  background: #7159c1;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:disabled {
  background: #d0d0d0;
  cursor: not-allowed;
}

.attr-mensage{
  color: red;
  padding: 20px 0;
}

.form-group input:focus,
.form-group select:focus {
  border: 1px solid #5a4aa5;
  box-shadow: 0px 0px 5px 0px #5a4aa5;
}

.form-group input:disabled,
.form-group select:disabled {
  background-color: #d0d0d0;
}

</style>
