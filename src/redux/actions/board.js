import * as types from "../types/board";

export const addList = (data) => {
    return {
        type: types.ADD_LIST,
        value: data
    }
};

export const moveList = (data) => {
    return {
        type: types.MOVE_LIST,
        value: data
    }
};

export const deleteList = (data) => {
    return {
        type: types.DELETE_LIST,
        value: data
    }
};