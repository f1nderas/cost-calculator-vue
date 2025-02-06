<script setup lang="ts">
import { watch } from "vue";
import { useTariffStore } from "./stores/tariff.store";

const store = useTariffStore();

const savedData = localStorage.getItem("tariffData");
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    store.minutesIndex = parsedData.minutesIndex ?? 0;
    store.smsIndex = parsedData.smsIndex ?? 0;
    store.internetIndex = parsedData.internetIndex ?? 0;
    store.isRouterRented = parsedData.isRouterRented ?? false;
    store.phoneNumber = parsedData.phoneNumber ?? "";
  } catch (error) {
    console.error("Ошибка при парсинге данных из localStorage:", error);
  }
}

const saveToLocalStorage = () => {
  localStorage.setItem(
    "tariffData",
    JSON.stringify({
      minutesIndex: store.minutesIndex,
      smsIndex: store.smsIndex,
      internetIndex: store.internetIndex,
      isRouterRented: store.isRouterRented,
      phoneNumber: store.phoneNumber,
    })
  );
};

watch(
  [
    () => store.minutesIndex,
    () => store.smsIndex,
    () => store.internetIndex,
    () => store.isRouterRented,
    () => store.phoneNumber,
  ],
  saveToLocalStorage
);

const handleSubmit = (event: Event) => {
  event.preventDefault();

  const tariffData = {
    phoneNumber: store.phoneNumber,
    minutes: store.selectedMinutes,
    sms: store.selectedSms,
    internet: store.selectedInternet,
    isRouterRented: store.isRouterRented,
    totalPrice: store.totalPrice,
  };

  alert(JSON.stringify(tariffData, null, 2));
};
</script>

<template>
  <div class="app container">
    <h1 class="title">Настройте тариф</h1>
    <form class="form" @submit="handleSubmit">
      <div class="form-group">
        <h2 class="subtitle">Телефон</h2>
        <div class="input-phone__wrapper">
          <input
            v-model="store.phoneNumber"
            type="text"
            class="input-phone"
            placeholder="+7 (___) ___-__-__"
          />
          <span class="input-phone__help"> Обязательное поле</span>
        </div>
      </div>
      <div class="form-group">
        <h2 class="subtitle">Минуты</h2>
        <v-slider
          v-model="store.minutesIndex"
          :max="3"
          :step="1"
          :ticks="{ 0: '100', 1: '200', 2: '300', 3: '600' }"
          show-ticks="always"
          tick-size="4"
        />
      </div>
      <div class="form-group">
        <h2 class="subtitle">СМС</h2>
        <v-slider
          v-model="store.smsIndex"
          :max="3"
          :step="1"
          :ticks="{ 0: '0', 1: '50', 2: '100', 3: '150' }"
          show-ticks="always"
          tick-size="4"
        ></v-slider>
      </div>
      <div class="form-group">
        <h2 class="subtitle">Интернет</h2>
        <v-slider
          v-model="store.internetIndex"
          :max="3"
          :step="1"
          :ticks="{ 0: '5', 1: '10', 2: '15', 3: '25' }"
          show-ticks="always"
          tick-size="4"
        ></v-slider>
      </div>
      <div class="form-group">
        <h2 class="subtitle">Wi-Fi роутер</h2>
        <div class="checkbox__wrapper">
          <input v-model="store.isRouterRented" type="checkbox" id="wifi" class="checkbox__input" />
          <label for="wifi" class="checkbox__label">Аренда 99 ₽/мес.</label>
        </div>
      </div>
      <button type="submit" class="btn">
        <span>{{ store.totalPrice }} ₽</span>
        в месяц
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.input-phone {
  border: 1px solid #b8c6cf;
  border-radius: 8px;
  padding: 18px 16px;
  background-color: #fff;

  font-size: 24px;
  line-height: 100%;
  margin-right: auto;

  &__wrapper {
    display: flex;
    flex-direction: column;
  }

  &__help {
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    color: #86969c;
  }
}

.title {
  margin-bottom: 40px;
}

.btn {
  border-radius: 15px;
  padding: 33px 30px;
  background: #7a5cfa;
  font-weight: 700;
  font-size: 32px;
  line-height: 75%;
  letter-spacing: -0.03em;
  color: #fff;
  margin-right: auto;
  transition: all 0.3s ease;

  &:hover {
    background-color: #000;
  }

  > span {
    font-weight: 400;
    font-size: 24px;
  }
}

.form-group .subtitle {
  margin-bottom: 30px;
}

.checkbox {
  &__wrapper {
    display: flex;
    gap: 10px;
  }
  &__input {
    cursor: pointer;
  }
  &__label {
    cursor: pointer;
  }
}
</style>
