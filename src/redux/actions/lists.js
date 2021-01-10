import * as types from "../types/lists";

export const addList = (data) => {
    return {
        type: types.ADD_LIST,
        value: data
    }
};

export const changeListTitle = (data) => {
    return {
        type: types.CHANGE_LIST_TITLE,
        value: data
    }
};

export const deleteList = (data) => {
    return {
        type: types.DELETE_LIST,
        value: data
    }
};

export const addCard = (data) => {
    return {
        type: types.ADD_CARD,
        value: data
    }
};

export const moveCard = (data) => {
    return {
        type: types.MOVE_CARD,
        value: data
    }
};

export const deleteCard = (data) => {
    return {
        type: types.DELETE_CARD,
        value: data
    }
};