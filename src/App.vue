<script setup>
import { ref, reactive } from "vue";
import Budged from "./components/Budged.vue";
import ManageBudged from "./components/ManageBudged.vue";
import Modal from "./components/Modal.vue";

import newExpenseIcon from "./assets/img/nuevo-gasto.svg";

const modal = reactive({
  show: false,
  animation: false,
});

const budged = ref(0);
const available = ref(0);

const defineBudged = (quantity) => {
  budged.value = quantity;
  available.value = quantity;
};

const showModal = () => {
  modal.show = true;
  setTimeout(() => {
    modal.animation = true;
  }, 300);
};

const closeModal = () => {
  modal.animation = false;
  setTimeout(() => {
    modal.show = false;
  }, 300);
};
</script>

<template>
  <div>
    <header>
      <h1>Expenses Manager</h1>
      <div class="container-header container shadow">
        <Budged v-if="budged === 0" @define-budged="defineBudged" />
        <ManageBudged v-else :budged="budged" :available="available" />
      </div>
    </header>
    <main v-if="budged > 0">
      <div class="create-expense">
        <img :src="newExpenseIcon" alt="new expense icon" @click="showModal" />
      </div>
      <Modal v-if="modal.show" @close-modal="closeModal" :modal="modal" />
    </main>
  </div>
</template>

<style>
:root {
  --azul: #3b82f6;
  --blanco: #fff;
  --gris-claro: #f5f5f5;
  --gris: #94a3b8;
  --gris-oscuro: #64748b;
  --negro: #000;
}
html {
  font-size: 62.5%;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
body {
  font-size: 1.6rem;
  font-family: "Lato", sans-serif;
  background-color: var(--gris-claro);
}
h1 {
  font-size: 4rem;
}
h2 {
  font-size: 3rem;
}
header {
  background-color: var(--azul);
}
header h1 {
  padding: 3rem 0;
  margin: 0;
  color: var(--blanco);
  text-align: center;
}
.container {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}
.container-header {
  margin-top: -5rem;
  transform: translateY(5rem);
  padding: 5rem;
}
.shadow {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: var(--blanco);
  border-radius: 1.2rem;
  padding: 5rem;
}

.create-expense {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}

.create-expense img {
  width: 5rem;
  cursor: pointer;
}
</style>
