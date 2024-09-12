<script setup>
import { ref } from "vue";
import Alert from "./Alert.vue";

const budged = ref(0);
const error = ref("");

const emits = defineEmits(["define-budged"]);

const defineBudged = () => {
  if (budged.value <= 0 || budged.value == "") {
    error.value = "Budged not valid";

    setTimeout(() => {
      error.value = "";
    }, 2000);
    return;
  }
  emits("define-budged", budged.value);
};
</script>

<template>
  <form class="budged" @submit.prevent="defineBudged">
    <Alert v-if="error">
      {{ error }}
    </Alert>
    <div class="campo">
      <label for="new-budged">Define Budged</label>
      <input
        id="new-budged"
        class="new-budged"
        placeholder="Add Your Budged"
        type="number"
        min="0"
        v-model.number="budged"
      />
    </div>
    <input type="submit" value="Define Budged" />
  </form>
</template>
<style scoped>
.budged {
  width: 100%;
}
.campo {
  display: grid;
  gap: 2rem;
}
.budged label {
  font-size: 2.2rem;
  text-align: center;
  color: var(--azul);
}
.budged input[type="number"] {
  background-color: var(--gris-claro);
  border-radius: 1rem;
  padding: 1rem;
  border: none;
  font-size: 2rem;
  text-align: center;
}
.budged input[type="submit"] {
  background-color: var(--azul);
  border: none;
  padding: 1rem;
  text-align: center;
  font-size: 2rem;
  margin-top: 2rem;
  color: var(--blanco);
  font-weight: 900;
  width: 100%;
  transition: background-color 300ms ease;
}
.budged input[type="submit"]:hover {
  background-color: #1048a4;
  cursor: pointer;
}
</style>
