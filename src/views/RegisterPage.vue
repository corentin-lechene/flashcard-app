<script lang="ts" setup>

import {IonButton, IonCard, IonCardContent, IonCardTitle, IonContent, IonInput, IonPage} from "@ionic/vue";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {ToastService} from "@/services/toast.service";

const email = ref("");
const password = ref("");

const router = useRouter();

function loginUser() {
  ToastService.success("Inscription réussite");
  router.replace('/home')
}

</script>

<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="flex h-full w-full">
        <ion-card class="m-auto w-full">
          <ion-card-content>
            <ion-card-title>Inscription</ion-card-title>
            <ion-input
                v-model="email"
                class="text-lg"
                fill="solid"
                label="Email"
                label-placement="floating"
                type="email"
            ></ion-input>
            <ion-input
                v-model="password"
                class="text-lg"
                fill="solid"
                label="Mot de passe"
                label-placement="floating"
                type="password"
            ></ion-input>
            <br>
            <ion-button class="bg-degraded" expand="block" @click="loginUser()">S'inscrire</ion-button>
            <p>Vous avez déjà un compte ? C'est par
              <span class="underline font-medium" @click="$router.replace('/auth/login')">la</span>
            </p>
          </ion-card-content>
        </ion-card>
      </div>

    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>