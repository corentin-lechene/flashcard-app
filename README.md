# FlashCard api

L’application se basera sur le fonctionnement du système de Leitner en mettant en place les principes de “répétition
espacée” et ”d’auto-évaluation”.

## Installation

### Prérequis

- Node.js
- npm

### Étapes d'installation

1. Clonez ce dépôt:
   ```bash
   git clone https://github.com/corentin-lechene/flashcard-app.git
   ```
2. Installez les dépendances:
   ```bash
    npm install
    ```
3. Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement suivantes:
    ```env
   # url de l'api
   VITE_API_URL=http://localhost:8080
   ```
4. Lancez le serveur:
    ```bash
    npm run dev
    ```
   et se mettre sous un format mobile pour une meilleure expérience.