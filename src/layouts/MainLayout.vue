<script setup lang="ts">

import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import {albums, home, settings} from 'ionicons/icons';

</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/home">
          <ion-icon aria-hidden="true" :icon="home" />
          <ion-label>Accueil</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/cards">
          <ion-icon aria-hidden="true" :icon="albums" />
          <ion-label>Cartes</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/settings">
          <ion-icon aria-hidden="true" :icon="settings" />
          <ion-label>Paramètres</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>