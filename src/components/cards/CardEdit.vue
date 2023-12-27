<script setup lang="ts">

import CardQuestion from "@/components/cards/CardQuestion.vue";
import CardAnswer from "@/components/cards/CardAnswer.vue";
import {computed} from "vue";
import {Card} from "@/models/card.model";
import {close} from "ionicons/icons";
import {IonBadge, IonButton, IonFooter, IonHeader, IonIcon, IonTitle} from "@ionic/vue";
import {ToastService} from "@/services/toast.service";

const props = defineProps<{modelValue: Card}>();
const emit = defineEmits(['update:modelValue', 'onClose']);

const card = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
});

function updateCard() {
  ToastService.success("Carte modifié avec succès");
  emit('onClose');
}
</script>

<template>
  <div class="ion-padding">
    <ion-header class="ion-no-border">
      <div class="flex flex-row-reverse justify-between py-4 px-2">
        <ion-badge class="rounded-full" color="light" @click="$emit('onClose')">
          <ion-icon :icon="close" class="text-2xl py-1"></ion-icon>
        </ion-badge>
        <ion-title class="text-xl">Edition</ion-title>
      </div>
    </ion-header>

    <CardQuestion
        v-model="card.question"
        :category="card.category"
        class="mb-4"
        mode="edit"
    />
    <CardAnswer
        v-model="card.answer"
        class="mb-4"
        mode="edit"
    />

    <ion-footer>
      <ion-button class="bg-degraded" expand="block" shape="round" @click.prevent="updateCard()">
        Modifier
      </ion-button>
    </ion-footer>
  </div>
</template>

<style scoped>

</style>