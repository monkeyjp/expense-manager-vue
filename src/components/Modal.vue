<script setup>
import closeModal from "../assets/img/cerrar.svg";

const emit = defineEmits(["close-modal"]);
const props = defineProps({
  modal: {
    type: Object,
    required: true,
  },
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
      <form class="new-expense">
        <legend>Add Expense</legend>
        <div class="campo">
          <label for="name">Expense Name:</label>
          <input type="text" id="name" placeholder="Add Expense Name" />
        </div>
        <div class="campo">
          <label for="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            placeholder="Add Expense Quantity, Ex. 300"
          />
        </div>
        <div class="campo">
          <label for="category">Category:</label>
          <select id="category">
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
        <input type="submit" value="Add Expense" />
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
