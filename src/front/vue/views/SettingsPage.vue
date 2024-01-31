<script lang="ts" setup>

import {
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import {computed, ref} from "vue";
import {logIn, logOut, person, sunnyOutline} from "ionicons/icons";

const isLogged = computed(() => true);
const darkMode = ref<'auto' | 'on' | 'off'>("auto");

const themeToggle = ref(false);

// Use matchMedia to check the user preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Add or remove the "dark" class on the document body
const toggleDarkTheme = (shouldAdd: boolean) => {
  document.body.classList.toggle('dark', shouldAdd);
};

// Check/uncheck the toggle and update the theme based on isDark
const initializeDarkTheme = (isDark: boolean) => {
  themeToggle.value = isDark;
  toggleDarkTheme(isDark);
};

// Initialize the dark theme based on the initial
// value of the prefers-color-scheme media query
initializeDarkTheme(prefersDark.matches);

// Listen for changes to the prefers-color-scheme media query
prefersDark.addEventListener('change', (mediaQuery) => {
  if(darkMode.value === 'auto') {
    initializeDarkTheme(mediaQuery.matches)
  }
});

// Listen for the toggle check/uncheck to toggle the dark theme
const toggleDarkMode = () => {
  if(darkMode.value === 'on' || darkMode.value === 'off') {
    toggleDarkTheme(darkMode.value === 'on')
  } else {
    toggleDarkTheme(themeToggle.value);
  }
};
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true" color="light">
      <ion-header>
        <ion-toolbar>
          <ion-title>Parametres</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card>
        <ion-item lines="none">
          <ion-icon slot="start" :icon="isLogged ? person : person"></ion-icon>
          <ion-label v-if="isLogged">
            <h1>Nom Prénom</h1>
            <p class="text-sm italic">Inscrit depuis le 23/02/2024</p>
          </ion-label>
          <ion-label v-else class="py-4">Se connecter</ion-label>
          <ion-icon
              slot="end"
              :icon="isLogged ? logOut : logIn"
              @click="$router.push(`/auth/${isLogged ? 'logout' : 'login'}`)"
          ></ion-icon>
        </ion-item>

      </ion-card>

      <ion-list class="m-0" inset>
        <ion-item>
          <ion-icon slot="start" :icon="sunnyOutline"></ion-icon>
          <ion-select v-model="darkMode" aria-label="dark-mode" interface="popover" label="Mode sombre"
                      @ionChange="toggleDarkMode()">
            <ion-select-option value="on">Activé</ion-select-option>
            <ion-select-option value="off">Désactivé</ion-select-option>
            <ion-select-option value="auto">Automatique</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>