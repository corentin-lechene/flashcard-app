<script lang="ts" setup>
import {IonCard, IonText, IonInput} from "@ionic/vue";
import {computed} from "vue";


interface CardQuestionProps {
  modelValue: string,
  category: number,
  tag: string,
  mode?: 'edit' | 'read'
}

const props = withDefaults(defineProps<CardQuestionProps>(), {mode: 'read'});
const emit = defineEmits(['onClick', 'update:modelValue', "update:tag"]);

const title = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
});

const _tag = computed({
  get: () => props.tag,
  set: (val) => emit("update:tag", val)
});

</script>

<template>
  <ion-card class="flex flex-col items-center justify-center text-center relative px-8 m-0 w-full" @click="$emit('onClick')">
    <ion-text v-if="mode === 'read'" class="text-2xl mb-2">{{ title }}</ion-text>
    <ion-input
        v-else-if="mode === 'edit'"
        v-model="title"
        placeholder="Quelle est votre question ?"
        class="text-2xl"
    >
    </ion-input>

    <ion-text class="text-xs text-degraded">Catégorie n°{{ category }}</ion-text>
    <ion-text v-if="mode === 'read'" class="absolute top-2 right-2">{{ _tag }}</ion-text>
    <ion-input
        v-else
        v-model="_tag"
        class="absolute top-2 right-2 w-20"
        placeholder="Saisir un tag"
    ></ion-input>
  </ion-card>
</template>

<style scoped>
ion-card {
  min-height: 15em;
}
</style>