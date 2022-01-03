/* eslint-disable no-sequences */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import ActionTypes from '../constants/ActionTypes';

export const createPunctuation = (punctuations) => ({
  type: ActionTypes.PUNCTUATION_CREATE,
  payload: {
    punctuations,
  },
});

createPunctuation.success = (localId, punctuations) => ({
  type: ActionTypes.PUNCTUATION_CREATE__SUCCESS,
  payload: {
    localId,
    punctuations,
  },
});

createPunctuation.failure = (localId, error) => ({
  type: ActionTypes.PUNCTUATION_CREATE__FAILURE,
  payload: {
    localId,
    error,
  },
});

export const handlePunctuationCreate = (punctuations) => ({
  type: ActionTypes.PUNCTUATION_CREATE_HANDLE,
  payload: {
    punctuations,
  },
});

export const updatePunctuation = (id, data) => ({
  type: ActionTypes.PUNCTUATION_UPDATE,
  payload: {
    id,
    data,
  },
});

updatePunctuation.success = (punctuations) => ({
  type: ActionTypes.PUNCTUATION_UPDATE__SUCCESS,
  payload: {
    punctuations,
  },
});

updatePunctuation.failure = (id, error) => ({
  type: ActionTypes.PUNCTUATION_UPDATE__FAILURE,
  payload: {
    id,
    error,
  },
});

export const handlePunctuationUpdate = (punctuations) => ({
  type: ActionTypes.PUNCTUATION_UPDATE_HANDLE,
  payload: {
    punctuations,
  },
});

export const deletePunctuation = (id) => ({
  type: ActionTypes.PUNCTUATION_DELETE,
  payload: {
    id,
  },
});

deletePunctuation.success = (punctuations) => ({
  type: ActionTypes.PUNCTUATION_DELETE__SUCCESS,
  payload: {
    punctuations,
  },
});

deletePunctuation.failure = (id, error) => ({
  type: ActionTypes.PUNCTUATION_DELETE__FAILURE,
  payload: {
    id,
    error,
  },
});

export const handlePunctuationDelete = (punctuations) => ({
  type: ActionTypes.PUNCTUATION_DELETE_HANDLE,
  payload: {
    punctuations,
  },
});

export const addPunctuationToCard = (id, cardId) => ({
  type: ActionTypes.PUNCTUATION_TO_CARD_ADD,
  payload: {
    id,
    cardId,
  },
});

addPunctuationToCard.success = (cardPunctuations) => ({
  type: ActionTypes.PUNCTUATION_TO_CARD_ADD__SUCCESS,
  payload: {
    cardPunctuations,
  },
});

addPunctuationToCard.failure = (id, cardId, error) => ({
  type: ActionTypes.PUNCTUATION_TO_CARD_ADD__FAILURE,
  payload: {
    id,
    cardId,
    error,
  },
});

export const handlePunctuationToCardAdd = (cardPunctuations) => ({
  type: ActionTypes.PUNCTUATION_TO_CARD_ADD_HANDLE,
  payload: {
    cardPunctuations,
  },
});

export const removePunctuationFromCard = (id, cardId) => ({
  type: ActionTypes.PUNCTUATION_FROM_CARD_REMOVE,
  payload: {
    id,
    cardId,
  },
});

removePunctuationFromCard.success = (cardPunctuations) => ({
  type: ActionTypes.PUNCTUATION_FROM_CARD_REMOVE__SUCCESS,
  payload: {
    cardPunctuations,
  },
});

removePunctuationFromCard.failure = (id, cardId, error) => ({
  type: ActionTypes.PUNCTUATION_FROM_CARD_REMOVE__FAILURE,
  payload: {
    id,
    cardId,
    error,
  },
});

export const handlePunctuationFromCardRemove = (cardPunctuations) => ({
  type: ActionTypes.PUNCTUATION_FROM_CARD_REMOVE_HANDLE,
  payload: {
    cardPunctuations,
  },
});

export const addPunctuationToBoardFilter = (id, boardId) => ({
  type: ActionTypes.PUNCTUATION_TO_BOARD_FILTER_ADD,
  payload: {
    id,
    boardId,
  },
});

export const removePunctuationFromBoardFilter = (id, boardId) => ({
  type: ActionTypes.PUNCTUATION_FROM_BOARD_FILTER_REMOVE,
  payload: {
    id,
    boardId,
  },
});
