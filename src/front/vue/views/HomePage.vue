<script lang="ts" setup>

import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonFooter,
  IonHeader,
  IonModal,
  IonPage,
  IonRange,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import {onMounted, ref} from "vue";
import {Card} from "@/domain/models/card.model";
import CardQuestion from "@/front/vue/components/cards/CardQuestion.vue";
import CardAnswer from "@/front/vue/components/cards/CardAnswer.vue";
import {ToastService} from "@/application/services/toast.service";
import {CardService} from "@/application/services/card.service";
import {FlashcardApiCard} from "@/api/flashcard/flashcard-api-card";

const openCourseModal = ref(false);

const cards = ref<Card[]>([
  {
    id: "qsqs1",
    question: "Ma question un peu longue sera la suivante : qui suis-je ?",
    answer: "la réponse",
    category: 2,
    tag: "tag1"
  },
  {
    id: "qsqs2",
    question: "ma question qsqs2",
    answer: "la réponse",
    category: 2,
    tag: "tag1"
  },
  {
    id: "qsqs3",
    question: "ma question qsqs3",
    answer: "la réponse",
    category: 6,
    tag: "tag1"
  },
  {
    id: "qsqs4",
    question: "ma question qsqs4",
    answer: "la réponse",
    category: 3,
    tag: "tag1"
  },
  {
    id: "qsqs5",
    question: "ma question qsqs5",
    answer: "la réponse",
    category: 1,
    tag: "tag1"
  },
  {
    id: "qsqs6",
    question: "ma question qsqs6",
    answer: "la réponse",
    category: 1,
    tag: "tag1"
  },
  {
    id: "qsqs7",
    question: "ma question qsqs7",
    answer: "la réponse",
    category: 4,
    tag: "tag1"
  },
  {
    id: "qsqs8",
    question: "ma question qsqs8",
    answer: "la réponse",
    category: 3,
    tag: "tag1"
  },
  {
    id: "qsqs9",
    question: "ma question qsqs9",
    answer: "la réponse",
    category: 2,
    tag: "tag1"
  }
])
const currentCard = ref<Card>();
const answer = ref("");
const answerCounter = ref(0);
const didAnswer = ref(false);

onMounted(async () => {
  const cardService = new CardService(new FlashcardApiCard());
  try {
    const fetchedCards = await cardService.fetchCards();
    if (!fetchedCards) {
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

async function onAnswer(forceGoodAnswer = false) {
  if(!currentCard.value) return;
  didAnswer.value = true;
  try {
    const cardService = new CardService(new FlashcardApiCard());

    if(forceGoodAnswer) {
      await cardService.answerCard(currentCard.value, currentCard.value.answer);
    } else {
      await cardService.answerCard(currentCard.value, answer.value);
    }

    await ToastService.success("Réponse correcte");
    nextQuestion();
  } catch (e) {
    console.error(e);
    await ToastService.error("Mauvaise réponse");
  }
}

function nextQuestion() {
  answerCounter.value++;
  answer.value = "";
  didAnswer.value = false;
  currentCard.value = cards.value.shift();

  //if empty close
  if(!currentCard.value) {
    openCourseModal.value = false;
  }
}
</script>


<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Accueil</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :force-overscroll="false">

      <div class="flex h-full">
        <ion-card class="m-auto px-8 py-4">
          <div class="flex flex-col items-center justify-center text-center mb-4">
            <ion-text class="text-2xl mb-2">Répondre aux questions</ion-text>
            <ion-text class="text-xs text-degraded">Catégories 3 à 5</ion-text>
          </div>
          <ion-button expand="block" size="small" @click="openCourseModal = true">Commencer</ion-button>
        </ion-card>
      </div>

      <ion-modal
          :is-open="openCourseModal"
          @didDismiss="openCourseModal = false"
      >
        <ion-header>
          <ion-toolbar>
            <ion-title>Questionnaire</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="openCourseModal = false">Fermer</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <div v-if="currentCard" class="flex flex-col justify-center items-center">
            <ion-range
                :max="answerCounter + cards.length"
                :value="answerCounter"
                class="w-full rounded"
                disabled
            ></ion-range>
            <CardQuestion
                v-if="!didAnswer"
                :category="currentCard.category"
                :model-value="currentCard.question"
                :tag="currentCard.tag"
            />
            <CardAnswer v-else :model-value="currentCard.answer"/>
          </div>
          <div v-else>Vous n'avez plus de question !</div>

        </ion-content>

        <ion-footer>
          <ion-toolbar>
            <ion-textarea v-model="answer" :rows="3" placeholder="Votre réponse"></ion-textarea>
            <ion-button v-if="!didAnswer" expand="block" size="small" @click="onAnswer()">Confirmer</ion-button>
            <div v-else class="flex gap-x-1">
              <ion-button
                  class="w-3/5"
                  expand="block"
                  size="small"
                  @click="onAnswer(true)"
              >
                C'est la bonne réponse
              </ion-button>
              <ion-button
                  class="w-2/5"
                  expand="block"
                  size="small"
                  color="secondary"
                  @click="nextQuestion()"
              >
                Continuer
              </ion-button>
            </div>
          </ion-toolbar>
        </ion-footer>
      </ion-modal>

    </ion-content>
  </ion-page>
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