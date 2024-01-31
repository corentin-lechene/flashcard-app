import {Category} from "@/domain/models/category.model";

export type CardId = string;

export type Card = {
    id: CardId;
    question: string;
    answer: string;
    category: Category;
    tag: string;
}