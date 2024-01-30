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
import {ToastService} from "@/application/services/toast.service";

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

function nextCard() {
  if (!answer.value?.trim() || !currentCard.value) {
    ToastService.warning("La réponse ne peut pas être vide");
    return;
  }
  answerCounter.value += 1;

  if (answer.value.toLowerCase() !== currentCard.value.answer.toLowerCase()) {
    //mauvaise réponse
    ToastService.error("Ce n'est pas la bonne réponse");
  } else {
    // bonne réponse
    ToastService.success("C'est la bonne réponse");
  }
  // next
  currentCard.value = cards.value.shift();

  //if empty close
  if(!currentCard.value) {
    openCourseModal.value = false;
  }
}

onMounted(() => {
  currentCard.value = cards.value.shift()
})
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
            <CardQuestion :category="currentCard.category" :model-value="currentCard.question" :tag="currentCard.tag"/>
            <ion-range class="w-full rounded" :value="answerCounter" :max="answerCounter + cards.length" disabled></ion-range>
          </div>
          <div v-else>Vous n'avez plus de question !</div>


        </ion-content>

        <ion-footer>
          <ion-toolbar>
            <ion-textarea v-model="answer" :rows="3" placeholder="Votre réponse"></ion-textarea>
            <ion-button expand="block" size="small" @click="nextCard()">Confirmer</ion-button>
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
</style>