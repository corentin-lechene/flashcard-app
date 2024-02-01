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
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import {onMounted, ref} from "vue";
import {add} from "ionicons/icons";
import CardNew from "@/front/vue/components/cards/CardNew.vue";
import {Card} from "@/domain/models/card.model";
import CardListItem from "@/front/vue/components/cards/CardListItem.vue";
import CardEdit from "@/front/vue/components/cards/CardEdit.vue";
import {FlashcardApiCard} from "@/api/flashcard/flashcard-api-card";
import {CardService} from "@/application/services/card.service";
import {Category} from "@/domain/models/category.model";
import FilterDropdownTags from "@/front/vue/components/cards/FilterDropdownTags.vue";

const cardService = new CardService(new FlashcardApiCard());

const cards = ref<Card[]>([])
const filteringCards = ref<Card[]>([])

const openNewCardModal = ref(false);
const openCardEditModal = ref(false);
const cardSelected = ref(null);
const cardsListRef = ref();

const tags = ref<string[]>([]);

function removeCard(card: Card) {
  cards.value = cards.value.filter(c => c.id !== card.id);
  if(cardsListRef.value) {
    cardsListRef.value.$el.closeSlidingItems()
  }
}


onMounted(async () => {
  await fetchCards();
});

async function fetchCards() {
  cards.value = await cardService.fetchCards();
  filteringCards.value = cards.value.slice();
  getTags();
}

function getTags() {

  cards.value.forEach(card => {
    const tag = card.tag.toLowerCase();
    if(!tags.value.includes(tag)) {
      tags.value.push(tag);
    }
  });
}


async function handleCheckBoxCardsTags (tags: string[])  {
  filteringCards.value = await cardService.fetchCardsByTags([...tags]);

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
        </ion-toolbar>
      </ion-header>

      <ion-fab slot="fixed" horizontal="end" vertical="bottom">
        <ion-fab-button @click="openNewCardModal = true">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <FilterDropdownTags :tags="tags" @filterCards="handleCheckBoxCardsTags($event)"/>


      <ion-list ref="cardsListRef">
        <ion-item-group v-for="(_, y) in Category.DONE" :key="y">
          <ion-item-divider>
            <ion-label>Catégorie {{ y }}</ion-label>
          </ion-item-divider>

          <CardListItem
              v-for="(card, i) in filteringCards.filter(c => c.category === y as Category)"
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
        <CardNew @onClose="openNewCardModal = false" @onCreated="fetchCards(); openNewCardModal = false"/>
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