<script setup lang="ts">

import {onMounted} from "vue";
import {ToastService} from "@/services/toast.service";
import router from "@/router";

onMounted(() => {
  ToastService.success("Déconnexion réussite");
  router.replace('/home')
});
</script>

<template>
<div>Déconnexion en cours</div>
</template>

<style scoped>

</style>