<script setup lang="ts">

import {filter} from "ionicons/icons";
import {CheckboxCustomEvent, IonFabButton, IonIcon, IonCheckbox, IonFab} from "@ionic/vue";

import {ref} from "vue";

const show = ref(false);
const emit = defineEmits(['filterCards']);

interface Tags{
  tags: string[]
}
defineProps<Tags>();

let tagsToFiltered : string[] = [];
function filterCard(e: CheckboxCustomEvent, tag: string) {
  if(e.detail.checked) {
    tagsToFiltered.push(tag);
  } else {
    tagsToFiltered = tagsToFiltered.filter(t => t !== tag);
  }

  emit('filterCards', [...tagsToFiltered]);
}

</script>

<template>
  <div>
    <ion-fab slot="fixed" vertical="top" horizontal="end">
      <ion-fab-button size="small" @click="show = !show">
        <ion-icon :icon="filter"></ion-icon>
      </ion-fab-button>
    </ion-fab>

    <div v-if="show" class=" relative bg-white text-black px-4 py-2 rounded">
      <h6>Filtrer par tags : </h6>
      <div class="flex flex-col gap-y-2">
        <ion-checkbox v-for="(tag, index) in tags" :key="index" :checked="tagsToFiltered.includes(tag)" label-placement="end" justify="start" @ionChange="filterCard($event, tag)">{{tag}}</ion-checkbox>
      </div>
    </div>
  </div>



</template>

<style scoped>

</style>

