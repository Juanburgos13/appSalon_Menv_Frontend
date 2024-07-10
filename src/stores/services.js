import { onMounted, ref } from "vue";

import ServicesAPI from "../api/ServicesAPI.js";
import { defineStore } from "pinia";

export const useServicesStore = defineStore("services", () => {
  const services = ref([]);

  onMounted(async () => {
    try {
      const { data } = await ServicesAPI.all();
      services.value = data;
    } catch (error) {
      console.log(error);
    }
  });

  return {
    services,
  };
});
