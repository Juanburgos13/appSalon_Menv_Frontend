<script setup>
import AuthApi from "../../api/AuthApi";
import { inject, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const toast = inject("toast");
const router = useRouter();
const route = useRoute();
const { token } = route.params;

onMounted(async () => {
  try {
    const { data } = await AuthApi.verifyAccount(token);
    toast.open({
      message: data.msg,
      type: "success",
    });

    setTimeout(() => {
      router.push({ name: "login" });
    }, 5000);
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: "error",
    });
  }
});
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Verificar cuentas
  </h1>
</template>
