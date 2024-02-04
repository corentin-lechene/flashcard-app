<script lang="ts" setup>
import {IonButton, IonCard, IonContent, IonHeader, IonModal, IonPage, IonText, IonTitle, IonToolbar} from '@ionic/vue';
import {ref} from "vue";
import QuizzSession from "@/front/vue/components/quizz/QuizzSession.vue";

const openQuizzModal = ref(false);

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
            <ion-text class="text-xs text-degraded">Catégories</ion-text>
          </div>
          <ion-button expand="block" size="small" @click="openQuizzModal = true">Commencer</ion-button>
        </ion-card>
      </div>

      <ion-modal
          :is-open="openQuizzModal"
          @didDismiss="openQuizzModal = false"
      >
        <QuizzSession @on-finish="openQuizzModal = false" @on-close="openQuizzModal = false"/>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>