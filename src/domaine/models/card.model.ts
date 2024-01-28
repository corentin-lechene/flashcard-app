export type CardId = string;

export enum Category {
    FIRST,
    SECOND,
    THIRD,
    FOURTH,
    FIFTH,
    SIXTH,
    SEVENTH, //todo est-ce que ça doit être un chiffre ou une string
    DONE
}

export type Card = {
    id: CardId;
    question: string;
    answer: string;
    category: Category;
    tag: string;
}