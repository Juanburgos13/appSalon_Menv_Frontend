import { computed, onMounted, ref } from "vue";

import AppointmentAPI from "../api/AppointmentAPI.js";
import AuthApi from "../api/AuthApi.js";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const userAppointments = ref([]);
  const router = useRouter();
  const user = ref({});
  const loading = ref(true);

  onMounted(async () => {
    try {
      const { data } = await AuthApi.auth();
      user.value = data;
      await getUserAppointments();
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  });

  async function getUserAppointments() {
    const { data } = await AppointmentAPI.getUserAppointments(user.value._id);
    userAppointments.value = data;
  }

  function logout() {
    localStorage.removeItem("AUTH_TOKEN");
    user.value = {};
    router.push({ name: "login" });
  }

  const getUserName = computed(() =>
    user.value?.name ? user.value?.name : ""
  );

  const noAppointments = computed(() => userAppointments.value.length === 0);

  return {
    user,
    getUserName,
    logout,
    userAppointments,
    getUserAppointments,
    noAppointments,
    loading,
  };
});
