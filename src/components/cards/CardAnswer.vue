<script lang="ts" setup>
import {IonCard, IonIcon, IonInput, IonText} from "@ionic/vue";
import {eye} from "ionicons/icons";
import {computed} from "vue";

interface CardAnswerProps {
  modelValue: string,
  mode?: 'edit' | 'read'
}

const props = withDefaults(defineProps<CardAnswerProps>(), {mode: 'read'});
const emit = defineEmits(['onClick', 'update:modelValue']);

const answer = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
});

</script>

<template>
  <ion-card class="flex flex-col items-center justify-center text-center relative px-8 m-0" @click="$emit('onClick')">
    <ion-text v-if="mode === 'read'" class="text-2xl">{{ answer }}</ion-text>
    <ion-input
        v-else-if="mode === 'edit'"
        v-model="answer"
        placeholder="Quelle est votre réponse ?"
        class="text-xl"
    >
    </ion-input>
    <ion-icon :icon="eye" class="absolute bottom-2 right-2" size="small"></ion-icon>
  </ion-card>
</template>

<style scoped>
ion-card {
  min-height: 15em;
}
</style>