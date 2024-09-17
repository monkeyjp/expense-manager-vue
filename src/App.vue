<script setup>
import { ref, reactive, watch, computed } from "vue";
import Budged from "./components/Budged.vue";
import ManageBudged from "./components/ManageBudged.vue";
import Modal from "./components/Modal.vue";
import Expense from "./components/Expense.vue";
import Filters from "./components/Filters.vue";
import { IdGenerator } from "./helpers";

import newExpenseIcon from "./assets/img/nuevo-gasto.svg";

const modal = reactive({
  show: false,
  animation: false,
});

const budged = ref(0);
const available = ref(0);
const spent = ref(0);
const filter = ref("");

const expense = reactive({
  name: "",
  amount: "",
  category: "",
  id: null,
  date: Date.now(),
});

const expenses = ref([]);

watch(
  expenses,
  () => {
    const totalSpent = expenses.value.reduce(
      (total, expense) => expense.amount + total,
      0
    );
    spent.value = totalSpent;
    available.value = budged.value - totalSpent;
  },
  {
    deep: true,
  }
);

watch(
  modal,
  () => {
    if (!modal.show) {
      resetExpenseState();
    }
  },
  {
    deep: true,
  }
);

const resetExpenseState = () => {
  Object.assign(expense, {
    name: "",
    amount: "",
    category: "",
    id: null,
    date: Date.now(),
  });
};

const defineBudged = (amount) => {
  budged.value = amount;
  available.value = amount;
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

const saveExpense = () => {
  if (expense.id) {
    const { id } = expense;
    const i = expenses.value.findIndex((expense) => expense.id === id);
    expenses.value[i] = { ...expense };
  } else {
    expenses.value.push({
      ...expense,
      id: IdGenerator(),
    });
  }
  closeModal();
  resetExpenseState();
};

const selectExpense = (id) => {
  const expenseToEdit = expenses.value.filter(
    (expense) => expense.id === id
  )[0];
  Object.assign(expense, expenseToEdit);
  showModal();
};

const deleteExpense = (id) => {
  expenses.value = expenses.value.filter((expense) => expense.id != id);
  closeModal();
};

const filteredExpenses = computed(() => {
  if (filter.value) {
    return expenses.value.filter(
      (expense) => expense.category === filter.value
    );
  }
  return expenses.value;
});
</script>

<template>
  <div :class="{ fix: modal.show }">
    <header>
      <h1>Expenses Manager</h1>
      <div class="container-header container shadow">
        <Budged v-if="budged === 0" @define-budged="defineBudged" />
        <ManageBudged
          v-else
          :budged="budged"
          :available="available"
          :spent="spent"
        />
      </div>
    </header>
    <main v-if="budged > 0">
      <Filters v-model:filter="filter" />
      <div class="expense-list container">
        <h2>
          {{
            filteredExpenses.length > 0 ? "Expenses" : "There are no expenses"
          }}
        </h2>
        <Expense
          v-for="expense in filteredExpenses"
          :key="expense.id"
          :expense="expense"
          @select-expense="selectExpense"
        />
      </div>

      <div class="create-expense">
        <img :src="newExpenseIcon" alt="new expense icon" @click="showModal" />
      </div>
      <Modal
        v-if="modal.show"
        @close-modal="closeModal"
        @save-expense="saveExpense"
        @delete-expense="deleteExpense"
        :modal="modal"
        :available="available"
        :id="expense.id"
        v-model:name="expense.name"
        v-model:amount="expense.amount"
        v-model:category="expense.category"
      />
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

.fix {
  overflow: hidden;
  height: 100vh;
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

.expense-list {
  margin-top: 10rem;
}

.expense-list h2 {
  font-weight: 900;
  color: var(--gris-oscuro);
}
</style>
