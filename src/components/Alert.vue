 <!-- <script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue';

export default defineComponent({
  name: 'Alert',
  props: {
    hasExtra: {
      type: Boolean,
      default: false
    },
    type: {
      type: String as PropType<'error' | 'success' | 'warning'>, // Definindo os tipos aceitos
      required: true,
      validator: (value: string) => ['error', 'success', 'warning'].includes(value) // Especificando o tipo do valor
    },
    message: {
      type: String,
      required: true
    },
    open: {
      type: Boolean,
      default: true
    },
    onButtonClick: {
      type: Function as PropType<() => void>,
      required: false
    }
  },
  setup(props) {
    onMounted(() => {
      setTimeout(() => {
        const alertElement = document.querySelector('.alert');
        if (alertElement) {
          alertElement.classList.add('fade-out');
        }
      }, 2000);
    });

    const handleClick = () => {
      if (props.onButtonClick) {
        props.onButtonClick();
      }
    };

    return {
      handleClick
    };
  }
});
</script>

<template>
  <div v-if="open" :class="['alert', type]">
    <p>{{ message }}</p>
    <button v-if="hasExtra" class="small" @click="handleClick">Ok</button>
  </div>
</template>

<style scoped>
/* Estilos para o componente */
.alert {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  color: white;
  border-radius: 5px;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  z-index: 1000;
}

.alert.fade-out {
  opacity: 0;
}

.alert.error {
  background-color: #f44336;
}

.alert.success {
  background-color: #4caf50;
}

.alert.warning {
  background-color: #ff9800;
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
</style> -->


<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Alert',
  props: {
    hasExtra: {
      type: Boolean,
      default: false
    },
    type: {
      type: String as PropType<'error' | 'success' | 'warning'>, // Definindo os tipos aceitos
      required: true,
      validator: (value: string) => ['error', 'success', 'warning'].includes(value) // Especificando o tipo do valor
    },
    message: {
      type: String,
      required: true
    },
    open: {
      type: Boolean,
      default: true
    },
    position: {
      type: String as PropType<'top-center' | 'top-right' | 'bottom-center' | 'top-left' >,
      default: 'top-right',
    }
  },

});
</script>

<template>
  <div v-if="open" :class="['alert', type, position]" >
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.alert {
  position: absolute;
  padding: 15px 20px;
  color: white;
  border-radius: 5px;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  z-index: 1000;
  animation: fadeOut 4s forwards; 
}

.alert.top-center {
  top: 250px;
  left: 50%;
  transform: translateX(-50%);
}

.alert.top-right {
  top: 20px;
  right: 20px;
}

.alert.top-left {
  top: 20px;
  left: 20px;
}

.alert.bottom-center {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    display: none;
  }
}

.alert.error {
  background-color: #f44336;
}

.alert.success {
  background-color: #4caf50;
}

.alert.warning {
  background-color: #ff9800;
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
