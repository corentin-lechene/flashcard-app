<script setup lang="ts">

import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonRange,
} from "@ionic/vue";
import CardAnswer from "@/front/vue/components/cards/CardAnswer.vue";
import CardQuestion from "@/front/vue/components/cards/CardQuestion.vue";
import {onMounted, ref} from "vue";
import {Card} from "@/domain/models/card.model";
import {CardService} from "@/application/services/card.service";
import {FlashcardApiCard} from "@/api/flashcard/flashcard-api-card";
import {ToastService} from "@/application/services/toast.service";

const emit = defineEmits(["on-finish", "on-close"]);

const cards = ref<Card[]>([]);
const currentCard = ref<Card>();
const answer = ref("");
const answerCounter = ref(0);
const didAnswer = ref(false);

onMounted(async () => {
  const cardService = new CardService(new FlashcardApiCard());
  try {
    const fetchedCards = await cardService.fetchCards();
    if (fetchedCards.length !== 0) {
      cards.value = fetchedCards;
      currentCard.value = cards.value.shift();
    } else {
      await ToastService.error("Aucune carte à afficher.");
    }
  } catch (e) {
    console.error(e);
    await ToastService.error("Erreur lors de la récupération des cartes.");
  }
});

async function onAnswer() {
  if(!currentCard.value) return;
  didAnswer.value = true;
  try {
    const cardService = new CardService(new FlashcardApiCard());
    const isAnswerValid = cardService.checkAnswer(currentCard.value, answer.value);

    if(isAnswerValid) {
      await ToastService.success("Bonne réponse !");
      await validAnswer(true);
    } else {
      await ToastService.error("Mauvaise réponse");
    }
  } catch (e) {
    console.error(e);
    await ToastService.error("Une erreur s'est produite");
  }
}

async function validAnswer(forceGoodAnswer = false) {
  const cardService = new CardService(new FlashcardApiCard());
  await cardService.answerCard(currentCard.value!, forceGoodAnswer);
  nextQuestion();
}

function nextQuestion() {
  answerCounter.value++;
  answer.value = "";
  didAnswer.value = false;
  currentCard.value = cards.value.shift();

  //if empty close
  if(!currentCard.value) {
    emit("on-finish");
  }
}
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Questionnaire</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="$emit('on-close')">Fermer</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <div v-if="currentCard" class="flex flex-col justify-center items-center">
      <ion-range
          :max="answerCounter + cards.length"
          :value="answerCounter"
          :step="1"
          class="w-full rounded mb-5"
          disabled
      ></ion-range>
      <CardQuestion
          v-if="!didAnswer"
          :category="currentCard.category + 1"
          :model-value="currentCard.question"
          :tag="currentCard.tag"
      />
      <CardAnswer v-else :model-value="currentCard.answer"/>
    </div>
    <div v-else>Vous n'avez plus de question !</div>

  </ion-content>

  <ion-footer>
    <ion-toolbar>
      <ion-textarea v-if="!didAnswer" v-model="answer" :rows="3" placeholder="Votre réponse"></ion-textarea>
      <ion-button v-if="!didAnswer" expand="block" size="small" @click="onAnswer()">Confirmer</ion-button>
      <div v-else class="flex gap-x-1">
        <ion-button
            class="w-3/5"
            expand="block"
            size="small"
            @click="validAnswer(true)"
        >
          C'est la bonne réponse
        </ion-button>
        <ion-button
            class="w-2/5"
            expand="block"
            size="small"
            color="secondary"
            @click="validAnswer()"
        >
          Continuer
        </ion-button>
      </div>
    </ion-toolbar>
  </ion-footer>
</template>

<style scoped>
ion-range {
  --bar-background: linear-gradient(92deg, #DD26F8 5.84%, #7C43F6 99.96%);
  --bar-height: 0.5em;
  --bar-border-radius: 1em;
}

ion-button {
  --padding-bottom: 1em;
  --padding-top: 1em;
}
</style>