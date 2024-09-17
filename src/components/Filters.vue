<script setup>
defineProps(["filter"]);
defineEmits(["update:filter"]);
</script>

<template>
  <div class="filters shadow container">
    <form>
      <div class="campo">
        <label for="filter">Filter Expenses</label>
        <select
          id="filter"
          :value="filter"
          @input="$emit('update:filter', $event.target.value)"
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
    </form>
  </div>
</template>
<style scoped>
.filters {
  margin-top: 10rem;
}

.filters .campo {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.filters label {
  font-size: 3rem;
  font-weight: 900;
  color: var(--gris-oscuro);
}

.filters select {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  background-color: var(--gris-claro);
  text-align: center;
}
</style>
