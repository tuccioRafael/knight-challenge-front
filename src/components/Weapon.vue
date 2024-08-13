<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "Weapon",
  props: {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    attr: {
      type: String,
      required: true,
    },
    equipped: {
      type: Boolean,
      default: false,
    },
    equipWeapon: {
      type: Function as unknown as () => (id: string) => void,
      required: true,
    }
  },
  setup(props) {
    const equip = () => {
      props.equipWeapon(props._id);
    };

    return {
      equip,
    }
  }
});
</script>

<template>
  <div :class="equipped ? 'equipped' : 'weapon'" @click="equip">
    <p>{{ name }}</p>
    <p>{{ attr }}</p>
  </div>
</template>

<style scoped>
.equipped {
  background-color: #7159c1;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
}

.weapon {
  border: 1px solid #7159c1;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
}
</style>
