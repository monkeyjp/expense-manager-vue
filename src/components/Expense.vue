<script setup>
import { quantityFormater, dateFormater } from "../helpers";
import savingsIcon from "../assets/img/icono_ahorro.svg";
import housingIcon from "../assets/img/icono_casa.svg";
import foodIcon from "../assets/img/icono_comida.svg";
import miscellaneousIcon from "../assets/img/icono_gastos.svg";
import entertainmentIcon from "../assets/img/icono_ocio.svg";
import healthIcon from "../assets/img/icono_salud.svg";
import subscriptionsIcon from "../assets/img/icono_suscripciones.svg";

const iconsDictionary = {
  savings: savingsIcon,
  food: foodIcon,
  housing: housingIcon,
  miscellaneous: miscellaneousIcon,
  entertainment: entertainmentIcon,
  health: healthIcon,
  subscriptions: subscriptionsIcon,
};

const props = defineProps({
  expense: {
    type: Object,
    required: true,
  },
});

defineEmits(["select-expense"]);
</script>

<template>
  <div class="expense shadow">
    <div class="content">
      <img
        :src="iconsDictionary[expense.category]"
        alt="expense icon"
        class="icon"
      />
      <div class="details">
        <p class="category">{{ expense.category }}</p>
        <p class="name" @click="$emit('select-expense', expense.id)">
          {{ expense.name }}
        </p>
        <p class="date">
          Date:
          <span>
            {{ dateFormater(expense.date) }}
          </span>
        </p>
      </div>
    </div>
    <p class="amount">{{ quantityFormater(expense.amount) }}</p>
  </div>
</template>
<style scoped>
.expense {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.content {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.icon {
  width: 5rem;
}

.details p {
  margin: 0 0 1rem 0;
}

.category {
  color: var(--gris);
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 900;
}

.name {
  color: var(--gris-oscuro);
  font-size: 2.4rem;
  font-weight: 700;
  cursor: pointer;
}

.date {
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--gris-oscuro);
}

.date span {
  font-weight: 400;
}

.amount {
  font-size: 3rem;
  font-weight: 900;
  margin: 0;
}
</style>
