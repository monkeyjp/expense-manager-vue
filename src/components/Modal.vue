<script setup>
import { ref, computed } from "vue";
import Alert from "./Alert.vue";
import closeModal from "../assets/img/cerrar.svg";

const error = ref("");

const emit = defineEmits([
  "close-modal",
  "save-expense",
  "update:name",
  "update:amount",
  "update:category",
]);
const props = defineProps({
  modal: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: [String, Number],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
  id: {
    type: [String, null],
    required: true,
  },
});

const oldAmount = props.amount;

const addExpense = () => {
  const { name, amount, category, available, id } = props;
  if ([name, amount, category].includes("")) {
    error.value = "All Fields Are Required";
    setTimeout(() => {
      error.value = "";
    }, 2000);
    return;
  }
  if (amount <= 0) {
    error.value = "Invalid Amount";
    setTimeout(() => {
      error.value = "";
    }, 2000);
    return;
  }
  if (id) {
    if (amount > oldAmount + available) {
      error.value = "You cant spend more than you have";
      setTimeout(() => {
        error.value = "";
      }, 2000);
      return;
    }
  } else {
    if (amount > available) {
      error.value = "You cant spend more than you have";
      setTimeout(() => {
        error.value = "";
      }, 2000);
      return;
    }
  }
  emit("save-expense");
};

const isEditing = computed(() => {
  return props.id;
});
</script>

<template>
  <div class="modal">
    <div class="close-modal">
      <img
        :src="closeModal"
        alt="close modal icon"
        @click="$emit('close-modal')"
      />
    </div>
    <div
      class="container form-container"
      :class="[modal.animation ? 'animation' : 'close']"
    >
      <form class="new-expense" @submit.prevent="addExpense">
        <legend>{{ isEditing ? "Save Changes" : "Add Expense" }}</legend>
        <Alert v-if="error">{{ error }}</Alert>
        <div class="campo">
          <label for="name">Expense Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Add Expense Name"
            :value="name"
            @input="$emit('update:name', $event.target.value)"
          />
        </div>
        <div class="campo">
          <label for="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            placeholder="Add Expense Amount, Ex. 300"
            :value="amount"
            @input="$emit('update:amount', +$event.target.value)"
          />
        </div>
        <div class="campo">
          <label for="category">Category:</label>
          <select
            id="category"
            :value="category"
            @input="$emit('update:category', $event.target.value)"
          >
            <option value="">-- Select --</option>
            <option value="savings">Savings</option>
            <option value="food">Food</option>
            <option value="housing">Housing</option>
            <option value="miscellaneous">Miscellaneous Expenses</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>
        <input
          type="submit"
          :value="[isEditing ? 'Save Changes' : 'Add Expense']"
        />
      </form>
    </div>
  </div>
</template>
<style scoped>
.modal {
  position: absolute;
  background-color: rgb(0 0 0 / 0.9);
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.close-modal {
  position: absolute;
  top: 3rem;
  right: 3rem;
}

.form-container {
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: ease-in;
  opacity: 0;
}

.form-container.animation {
  opacity: 1;
}

.form-container.close {
  opacity: 0;
}

.close-modal img {
  width: 3rem;
  cursor: pointer;
}

.new-expense {
  margin: 10rem auto 0 auto;
  display: grid;
  gap: 2rem;
}

.new-expense legend {
  text-align: center;
  color: var(--blanco);
  font-size: 3rem;
  font-weight: 700;
}

.campo {
  display: grid;
  gap: 2rem;
}

.new-expense input,
.new-expense select {
  background-color: var(--gris-claro);
  border-radius: 1rem;
  padding: 1rem;
  border: none;
  font-size: 2.2rem;
}

.new-expense label {
  color: var(--blanco);
  font-size: 3rem;
}

.new-expense input[type="submit"] {
  background-color: var(--azul);
  color: var(--blanco);
  font-weight: 700;
  cursor: pointer;
}
</style>
