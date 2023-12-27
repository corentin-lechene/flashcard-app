<script lang="ts" setup>

import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar, SearchbarCustomEvent
} from '@ionic/vue';
import {ref} from "vue";
import {add} from "ionicons/icons";
import CardNew from "@/components/cards/CardNew.vue";
import {Card} from "@/models/card.model";
import CardListItem from "@/components/cards/CardListItem.vue";
import CardEdit from "@/components/cards/CardEdit.vue";

const categories = ref(7);

const cards = ref<Card[]>([
  {
    id: "qsqs1",
    question: "Ma question un peu longue sera la suivante : qui suis-je ?",
    answer: "la réponse",
    category: 2,
    createdAt: "12/07/23"
  },
  {
    id: "qsqs2",
    question: "ma question qsqs2",
    answer: "la réponse",
    category: 2,
    createdAt: "12/07/23"
  },
  {
    id: "qsqs3",
    question: "ma question qsqs3",
    answer: "la réponse",
    category: 6,
    createdAt: "12/07/23"
  },
  {
    id: "qsqs4",
    question: "ma question qsqs4",
    answer: "la réponse",
    category: 3,
    createdAt: "12/07/23"
  },
  {
    id: "qsqs5",
    question: "ma question qsqs5",
    answer: "la réponse",
    category: 1,
    createdAt: "12/07/23"
  },
  {
    id: "qsqs6",
    question: "ma question qsqs6",
    answer: "la réponse",
    category: 1,
    createdAt: "12/07/23"
  },
  {
    id: "qsqs7",
    question: "ma question qsqs7",
    answer: "la réponse",
    category: 4,
    createdAt: "12/07/23"
  },
  {
    id: "qsqs8",
    question: "ma question qsqs8",
    answer: "la réponse",
    category: 3,
    createdAt: "12/07/23"
  },
  {
    id: "qsqs9",
    question: "ma question qsqs9",
    answer: "la réponse",
    category: 2,
    createdAt: "12/07/23"
  }
])
const filteringCards = ref(cards.value);

const openNewCardModal = ref(false);
const openCardEditModal = ref(false);
const cardSelected = ref(null);
const cardsListRef = ref();

function removeCard(card: Card) {
  cards.value = cards.value.filter(c => c.id !== card.id);
  if(cardsListRef.value) {
    cardsListRef.value.$el.closeSlidingItems()
  }
}

function onSearchCards(event: SearchbarCustomEvent) {
  filteringCards.value = cards.value

  const value = event.detail?.value;
  if(!value) return;

  filteringCards.value = filteringCards.value.filter(card => card.question
      .toLowerCase()
      .includes(value.toLowerCase()));
}

</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cartes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Cartes</ion-title>
          <ion-searchbar animated show-cancel-button="focus" @ionInput="onSearchCards($event)"></ion-searchbar>
        </ion-toolbar>
      </ion-header>

      <ion-fab slot="fixed" horizontal="end" vertical="bottom">
        <ion-fab-button @click="openNewCardModal = true">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ion-list ref="cardsListRef">
        <ion-item-group v-for="category in categories" :key="category">
          <ion-item-divider>
            <ion-label>Catégorie {{ category }}</ion-label>
          </ion-item-divider>

          <CardListItem
              v-for="(card, i) in filteringCards.filter(c => c.category === category)"
              :key="i"
              :card="card"
              @onRemove="removeCard($event)"
              @onClick="openCardEditModal = true; cardSelected = $event"
          />
        </ion-item-group>
      </ion-list>


      <ion-modal
          :breakpoints="[0, 1]"
          :initial-breakpoint="1"
          :is-open="openNewCardModal"
          @didDismiss="openNewCardModal = false"
      >
        <CardNew @onClose="openNewCardModal = false" @onCreated="openNewCardModal = false"/>
      </ion-modal>

      <ion-modal
          :breakpoints="[0, 1]"
          :initial-breakpoint="1"
          :is-open="openCardEditModal"
          @didDismiss="openCardEditModal = false"
      >
        <CardEdit v-if="cardSelected" v-model="cardSelected" @onClose="openCardEditModal = false" />
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-modal {
  --height: auto;
}
</style>