<script setup>
import { computed } from "vue";
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";
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

defineEmits(["reset-app"]);

const percentage = computed(() => {
  return parseInt(((props.budged - props.available) / props.budged) * 100);
});
</script>

<template>
  <div class="two-columns">
    <div class="graphic-container">
      <p class="percentage">{{ percentage }}%</p>
      <CircleProgress
        :percent="percentage"
        :size="250"
        :border-width="25"
        :border-bg-width="25"
        fill-color="#3b82f6"
        empty-color="#e1e1e1"
      />
    </div>
    <div class="budged-container">
      <button class="reset-app" type="button" @click="$emit('reset-app')">
        Reset App
      </button>
      <p><span>Budged:</span> {{ quantityFormater(budged) }}</p>
      <p><span>Available:</span> {{ quantityFormater(available) }}</p>
      <p><span>Spent:</span>{{ quantityFormater(spent) }}</p>
    </div>
  </div>
</template>
<style scoped>
.graphic-container {
  position: relative;
}

.percentage {
  position: absolute;
  margin: auto;
  top: calc(50% - 1.5rem);
  left: 0;
  right: 0;
  text-align: center;
  z-index: 100;
  font-size: 3rem;
  font-weight: 900;
  color: var(--gris-oscuro);
}

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
