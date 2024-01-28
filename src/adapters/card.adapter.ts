import {CardApi} from "@/adapters/card.api";
import {Card} from "@/domaine/models/card.model";
import {CreatCard} from "@/services/card.service";

export class CardAdapter implements CardApi {
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

    updateCard(/*card: Card*/): Promise<void> {
        throw new Error("Method not implemented.");
    }

}