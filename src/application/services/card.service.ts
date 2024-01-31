import {CardApiInterface} from "@/domain/card.api.interface";
import {CardId} from "@/domain/models/card.model";
import {CreatCard} from "@/application/services/dto/create-card.dto";

export class CardService {
    constructor(private cardApiService: CardApiInterface) {
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