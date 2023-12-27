<script lang="ts" setup>
import {IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel} from "@ionic/vue";
import {eye, eyeOff} from "ionicons/icons";
import {Card} from "@/models/card.model";
import {ref} from "vue";


interface CardListItemProps {
  card: Card
}

const props = defineProps<CardListItemProps>();
defineEmits(['onRemove', 'onClick']);

const reveal = ref(false);


</script>

<template>
  <ion-item-sliding>
    <ion-item button lines="full" @click="$emit('onClick', card)">
      <ion-icon slot="start" :icon="reveal ? eye : eyeOff" @click.stop="reveal = !reveal"></ion-icon>
      <ion-label>
        <h1>{{ props.card.question }}</h1>
        <p :class="{'blur-sm': !reveal}">{{ props.card.answer }}</p>
      </ion-label>
    </ion-item>
    <ion-item-options side="end">
      <ion-item-option color="danger" expandable @click="$emit('onRemove', card)">Supprimer</ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<style scoped>

</style>