import { defineStore } from "pinia";
import { computed, ref } from "vue";

// interface TariffProps {
//   minutes: MinutesType;
//   sms: SmsType;
//   internet: InternetType;
//   additionalService: boolean;
//   phoneNumber: string;
// }

export const useTariffStore = defineStore("tariff", () => {
  const minutesIndex = ref(0);
  const smsIndex = ref(0);
  const internetIndex = ref(0);
  const isRouterRented = ref<boolean>(false);
  const phoneNumber = ref<string>("");

  const minutesOptions = [100, 200, 300, 600];
  const smsOptions = [0, 50, 100, 150];
  const internetOptions = [5, 10, 15, 25];

  const minutesPrices = [100, 180, 250, 400];
  const smsPrices = [0, 50, 90, 120];
  const internetPrices = [20, 350, 450, 600];

  const routerPrice = 99;

  const selectedMinutes = computed(() => minutesOptions[minutesIndex.value]);
  const selectedSms = computed(() => smsOptions[smsIndex.value]);
  const selectedInternet = computed(() => internetOptions[internetIndex.value]);

  const totalPrice = computed(() => {
    let total =
      minutesPrices[minutesIndex.value] +
      smsPrices[smsIndex.value] +
      internetPrices[internetIndex.value];
    if (isRouterRented.value) total += routerPrice;
    return total;
  });
  return {
    minutesIndex,
    smsIndex,
    internetIndex,
    isRouterRented,
    phoneNumber,
    selectedMinutes,
    selectedSms,
    selectedInternet,
    totalPrice,
  };
});
