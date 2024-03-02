import {Category} from "@/domain/models/category.model";

export class CardId {
    readonly value: string;

    constructor(value: string) {
        this.value = value;
    }
}

export type Card = {
    id: CardId;
    question: string;
    answer: string;
    category: Category;
    tag: string;
}