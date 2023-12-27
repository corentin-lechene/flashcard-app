<script lang="ts" setup>

import {IonBadge, IonButton, IonFooter, IonHeader, IonIcon, IonTitle} from "@ionic/vue";
import {arrowBack, close} from "ionicons/icons";
import CardQuestion from "@/components/cards/CardQuestion.vue";
import {ref} from "vue";
import CardAnswer from "@/components/cards/CardAnswer.vue";
import {ToastService} from "@/services/toast.service";

const emits = defineEmits(['onClose', 'onCreated'])

enum STEPS {
  QUESTION,
  ANSWER
}

const step = ref(STEPS.QUESTION);
const question = ref("");
const answer = ref("");


function nextStep() {
  if (step.value === STEPS.QUESTION) {
    if (!question.value.trim()) {
      ToastService.error("La question ne peut pas être vide")
      return;
    }
    // next step = answer
    step.value = STEPS.ANSWER;
  } else if (step.value === STEPS.ANSWER) {
    if (!answer.value.trim()) {
      ToastService.error("La réponse ne peut pas être vide")
      return;
    }
    // next step = creation
    ToastService.error("Pas encore implementé");
    emits('onCreated', {
      question: question.value,
      answer: answer.value,
    });
  } else {
    ToastService.error("Une erreur est survenue");
  }
}

</script>

<template>
  <div class="ion-padding">
    <ion-header class="ion-no-border">
      <div class="flex flex-row-reverse justify-between py-4 px-2">
        <ion-badge class="rounded-full" color="light" @click="$emit('onClose')">
          <ion-icon :icon="close" class="text-2xl py-1"></ion-icon>
        </ion-badge>
        <ion-title class="text-xl">Nouvelle carte</ion-title>
        <ion-badge v-show="step === STEPS.ANSWER" class="rounded-full" color="light" @click="step = STEPS.QUESTION">
          <ion-icon :icon="arrowBack" class="text-2xl py-1"></ion-icon>
        </ion-badge>
      </div>
    </ion-header>

    <CardQuestion
        v-if="step === STEPS.QUESTION"
        v-model="question"
        :category="1"
        class="mb-4"
        mode="edit"
    />
    <CardAnswer
        v-else-if="step === STEPS.ANSWER"
        v-model="answer"
        class="mb-4"
        mode="edit"
    />

    <ion-footer>
      <ion-button expand="block" shape="round" @click.prevent="nextStep()">
        {{ step === STEPS.QUESTION ? 'Suivant' : 'Créer la carte' }}
      </ion-button>
    </ion-footer>
  </div>
</template>

<style scoped>
ion-button {
  --background: linear-gradient(284deg, #7C43F6 0%, #D629FA 100%);
}
</style>