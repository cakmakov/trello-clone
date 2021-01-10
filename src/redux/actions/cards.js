import * as types from "../types/cards";

export const addCard = (data) => {
    return {
        type: types.ADD_CARD,
        value: data
    }
};

export const changeCardText = (data) => {
    return {
        type: types.CHANGE_CARD_TEXT,
        value: data
    }
};

export const deleteCard = (data) => {
    return {
        type: types.DELETE_CARD,
        value: data
    }
};

export const deleteList = (data) => {
    return {
        type: types.DELETE_LIST,
        value: data
    }
};