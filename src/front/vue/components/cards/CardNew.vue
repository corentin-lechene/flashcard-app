<script lang="ts" setup>

import {IonBadge, IonButton, IonFooter, IonHeader, IonIcon, IonTitle} from "@ionic/vue";
import {arrowBack, close} from "ionicons/icons";
import CardQuestion from "@/front/vue/components/cards/CardQuestion.vue";
import {ref} from "vue";
import CardAnswer from "@/front/vue/components/cards/CardAnswer.vue";
import {ToastService} from "@/application/services/toast.service";
import {FlashcardApiCard} from "@/api/flashcard/flashcard-api-card";
import {CardService} from "@/application/services/card.service";

const emits = defineEmits(['onClose', 'onCreated'])

const cardService = new CardService(new FlashcardApiCard());

enum STEPS {
  QUESTION,
  ANSWER
}

const step = ref(STEPS.QUESTION);
const question = ref("");
const answer = ref("");
const tag = ref("");


async function nextStep() {
  switch (step.value) {
    case STEPS.QUESTION:
      await onStepQuestion();
      break;

    case STEPS.ANSWER:
      await onStepAnswer();
      break;

    default:
      await ToastService.error("Une erreur est survenue");
  }
}

async function onStepQuestion() {
  if (!question.value.trim() || !tag.value.trim()) {
    await ToastService.error("La question ainsi que le tag ne peut pas être vides")
  } else {
    step.value = STEPS.ANSWER;
  }
}

async function onStepAnswer() {
  if (!answer.value.trim()) {
    await ToastService.error("La réponse ne peut pas être vide")
  } else {
    await createNewCard();
  }
}

async function createNewCard() {
  try {
    await cardService.createCard({
      question: question.value,
      answer: answer.value,
      tag: tag.value,
    });

    emits('onCreated', {
      question: question.value,
      answer: answer.value,
      tag: tag.value,
    });
  } catch (e: any) {
    await ToastService.error(e.message.toString());
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
        v-model:tag="tag"
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