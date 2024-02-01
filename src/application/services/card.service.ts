import {CardApiInterface} from "@/domain/card.api.interface";
import {Card, CardId} from "@/domain/models/card.model";
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

    fetchCardsByTags(tags: string[]): Promise<Card[]> {
        if(tags.length == 0) {
            return this.fetchCards();
        } else {
            return this.cardApiService.fetchCardsByTags(tags);
        }
    }

    createCard(createCard: CreatCard) {
        if(!createCard.question.trim() || !createCard.answer.trim() || !createCard.tag.trim()) {
            throw new Error("All fields must be fill");
        } else {
            return this.cardApiService.createCard(createCard);
        }
    }
    fetchCardById(cardId: CardId) {
        return this.cardApiService.fetchCardById(cardId);
    }

}