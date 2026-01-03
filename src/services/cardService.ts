import apiClient from "./apiClient";
import BusinessCard from "../interfaces/BusinessCard";


export const getAllCards = () => {
    return apiClient.get("/cards");
};


export const getMyCards = () => {
    return apiClient.get<BusinessCard[]>("/cards/my-cards");
};


export const getCardById = (cardId: string) => {
    return apiClient.get<BusinessCard>(`/cards/${cardId}`);
};

export const createCard = (data: any) => {
    return apiClient.post("/cards", data);
};


export const updateCard = (cardId: string, cardData: BusinessCard) => {
    return apiClient.put<BusinessCard>(`/cards/${cardId}`, cardData);
};


export const deleteCard = (cardId: string) => {
    return apiClient.delete(`/cards/${cardId}`);
};





