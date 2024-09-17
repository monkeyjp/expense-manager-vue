<script setup>
import image from "../assets/img/grafico.jpg";
import { quantityFormater } from "../helpers";

const props = defineProps({
  budged: {
    type: Number,
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
  spent: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="two-columns">
    <div class="graphic-container">
      <img :src="image" />
    </div>
    <div class="budged-container">
      <button class="reset-app">Reset App</button>
      <p><span>Budged:</span> {{ quantityFormater(budged) }}</p>
      <p><span>Available:</span> {{ quantityFormater(available) }}</p>
      <p><span>Spent:</span>{{ quantityFormater(spent) }}</p>
    </div>
  </div>
</template>
<style scoped>
.two-columns {
  display: flex;
  flex-direction: column;
}

.two-columns > :first-child {
  margin-bottom: 3rem;
}

@media (min-width: 768px) {
  .two-columns {
    flex-direction: row;
    gap: 4rem;
    align-items: center;
  }
  .two-columns > :first-child {
    margin-bottom: 0;
  }
}

.reset-app {
  background-color: #db2777;
  border: none;
  padding: 1rem;
  width: 100%;
  color: var(--blanco);
  font-weight: 900;
  text-transform: uppercase;
  border-radius: 1rem;
  transition-property: background-color;
  transition-duration: 300ms;
}

.reset-app:hover {
  cursor: pointer;
  background-color: #c11d67;
}

.budged-container {
  width: 100%;
}

.budged-container p {
  font-size: 2.4rem;
  text-align: center;
  color: var(--gris-oscuro);
}

@media (min-width: 768px) {
  .budged-container p {
    text-align: left;
  }
}

.budged-container span {
  font-weight: 900;
  color: var(--azul);
}
</style>
