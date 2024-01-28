import {CardApi} from "@/adapters/card.api";
import {CardId} from "@/domaine/models/card.model";


export type CreatCard = {
    question: string;
    answer: string;
    tag: string;
}


export class CardService {
    constructor(private cardApiService: CardApi) {
        this.cardApiService = cardApiService;
    }
    fetchCardOfTheDay() {
        return this.cardApiService.fetchCardOfTheDay();
    }
    fetchCards() {
        return this.cardApiService.fetchCards();
    }
    createCard(createCard: CreatCard) {
        return this.cardApiService.createCard(createCard);
    }
    fetchCardById(cardId: CardId) {
        return this.cardApiService.fetchCardById(cardId);
    }
}