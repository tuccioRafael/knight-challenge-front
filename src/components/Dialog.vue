<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Dialog',
  props: {
    hasExtra: {
      type: Boolean,
      default: false
    },
    type: {
      type: String as PropType<'error' | 'success' | 'warning'>, 
      required: true,
      validator: (value: string) => ['error', 'success', 'warning'].includes(value)
    },
    message: {
      type: String,
      required: true
    },
    open: {
      type: Boolean,
      default: true
    },
    onConfirm: {
      type: Function as PropType<() => void>,
      required: false
    },
    onCancel: {
      type: Function as PropType<() => void>,
      required: false
    }
  },
  setup(props) {

    const handleConfirm = () => {
      if (props.onConfirm) {
        props.onConfirm();
      }
    };

    const handleCancel = () => {
      if (props.onCancel) {
        props.onCancel();
      }
    };

    return {
      handleConfirm,
      handleCancel
    };
  }
});
</script>

<template>
  <div v-if="open" :class="['alert', type]">
    <p>{{ message }}</p>
    <div class="button-group" v-if="hasExtra">
      <button class="small" @click="handleConfirm">Confirmar</button>
      <button class="small" @click="handleCancel">Cancelar</button>
    </div>
  </div>
</template>

<style scoped>
.alert {
  position: absolute;
  top: 110px;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px 20px;
  color: white;
  border-radius: 5px;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  z-index: 1000;
}

.button-group {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.alert.fade-out {
  opacity: 0;
}

/* Estilos para diferentes tipos de alertas */
.alert.error {
  background-color: #f44336; /* Vermelho para erros */
}

.alert.success {
  background-color: #4caf50; /* Verde para sucesso */
}

.alert.warning {
  background-color: #ff9800; /* Laranja para avisos */
}

.small {
  font-size: 12px;
  padding: 5px 10px;
  background-color: white;
  color: #333;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.small:hover {
  background-color: #f0f0f0;
}
</style>

