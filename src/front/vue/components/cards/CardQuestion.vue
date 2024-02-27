<script lang="ts" setup>
import {IonCard, IonText, IonInput, IonTextarea} from "@ionic/vue";
import {computed} from "vue";


interface CardQuestionProps {
  modelValue: string,
  category: string,
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
    <ion-textarea
        v-model.trim="title"
        placeholder="Quelle est votre question ?"
        :maxlength="70"
        auto-grow
        class="text-2xl"
        :readonly="mode === 'read'"
    >
    </ion-textarea>

    <ion-text class="text-degraded">Catégorie n°{{ category }}</ion-text>
    <ion-text v-if="mode === 'read'" class="absolute top-2 right-5 text-right text-lg italic">{{ _tag }}</ion-text>
    <ion-input
        v-else
        v-model.trim="_tag"
        class="absolute top-2 right-5 text-right"
        placeholder="Saisir un tag"
    ></ion-input>
  </ion-card>
</template>

<style scoped>
ion-card {
  min-height: 15em;
}
</style>