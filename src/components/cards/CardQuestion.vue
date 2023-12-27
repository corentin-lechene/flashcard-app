<script lang="ts" setup>
import {IonCard, IonIcon, IonText, IonInput} from "@ionic/vue";
import {eyeOff} from "ionicons/icons";
import {computed} from "vue";


interface CardQuestionProps {
  modelValue: string,
  category: number,
  mode?: 'edit' | 'read'
}

const props = withDefaults(defineProps<CardQuestionProps>(), {mode: 'read'});
const emit = defineEmits(['onClick', 'update:modelValue']);

const title = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
});

</script>

<template>
  <ion-card class="flex flex-col items-center justify-center text-center relative px-8 m-0" @click="$emit('onClick')">
    <ion-text v-if="mode === 'read'" class="text-2xl mb-2">{{ title }}</ion-text>
    <ion-input
        v-else-if="mode === 'edit'"
        v-model="title"
        placeholder="Quelle est votre question ?"
        class="text-2xl"
    >
    </ion-input>

    <ion-text class="text-xs text-degraded">Catégorie n°{{ category }}</ion-text>
    <ion-icon :icon="eyeOff" class="absolute bottom-2 right-2" size="small"></ion-icon>
  </ion-card>
</template>

<style scoped>
ion-card {
  min-height: 15em;
}
</style>