import {CardApiInterface} from "@/domain/card.api.interface";
import {Card, CardId} from "@/domain/models/card.model";
import {CreatCard} from "@/application/services/dto/create-card.dto";

export class FlashcardApiCard implements CardApiInterface {
    async createCard(creatCard: CreatCard): Promise<void> {
        try {
            const url = `${import.meta.env.VITE_API_URL}/cards`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(creatCard)
            });
            if (!response.ok) {
                console.error(response);
            }
        } catch (e) {
            console.error(e);
        }
    }

    deleteCard(/*cardId: CardId*/): Promise<void> {
        throw new Error("Method not implemented.");
    }

    fetchCardById(/*cardId: CardId*/): Promise<Card> {
        throw new Error("Method not implemented.");
    }

    fetchCardOfTheDay(): Promise<Card[]> {
        throw new Error("Method not implemented.");
    }

    async fetchCards(): Promise<Card[]> {
        try {
            const url = `${import.meta.env.VITE_API_URL}/cards`;
            const response = await fetch(url);
            if (!response.ok) {
                return [];
            }
            return await response.json() as Card[];
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async fetchCardsByTags(tags: string[]): Promise<Card[]> {
        try {
            const url = `${import.meta.env.VITE_API_URL}/cards?`;

            let params = "";
            params += "tags=" + tags.pop();
            tags.forEach(tag => {
                params+= "&";
                params += "tags=" + tag;
            })

            const response = await fetch(url.concat(params));
            if (!response.ok) {
                return [];
            }
            return await response.json() as Card[];
        } catch (e) {
            console.error(e);
            return[];
        }
    }

    updateCard(/*card: Card*/): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async answerCard(cardId: CardId, isValid: boolean): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/cards/${cardId.value}/answer`;
        const body = {
            isValid: isValid
        };
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error();
        }
    }
}