/* eslint-disable no-sequences */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import EntryActionTypes from '../../constants/EntryActionTypes';

export const createPunctuationInCurrentBoard = (data) => (
  console.log('bbbbbbbbbbb'),
  {
  type: EntryActionTypes.PUNCTUATION_IN_CURRENT_BOARD_CREATE,
  payload: {
    data,
  },
}
);

export const handlePunctuationCreate = (punctuation) => ({
  type: EntryActionTypes.PUNCTUATION_CREATE_HANDLE,
  payload: {
    punctuation,
  },
});

export const updatePunctuation = (id, data) => ({
  type: EntryActionTypes.PUNCTUATION_UPDATE,
  payload: {
    id,
    data,
  },
});

export const handlePunctuationUpdate = (punctuation) => ({
  type: EntryActionTypes.PUNCTUATION_UPDATE_HANDLE,
  payload: {
    punctuation,
  },
});

export const deletePunctuation = (id) => ({
  type: EntryActionTypes.PUNCTUATION_DELETE,
  payload: {
    id,
  },
});

export const handlePunctuationDelete = (punctuation) => ({
  type: EntryActionTypes.PUNCTUATION_DELETE_HANDLE,
  payload: {
    punctuation,
  },
});

export const addPunctuationToCard = (id, cardId) => ({
  type: EntryActionTypes.PUNCTUATION_TO_CARD_ADD,
  payload: {
    id,
    cardId,
  },
});

export const addPunctuationToCurrentCard = (id) => ({
  type: EntryActionTypes.PUNCTUATION_TO_CURRENT_CARD_ADD,
  payload: {
    id,
  },
});

export const handlePunctuationToCardAdd = (cardPunctuation) => ({
  type: EntryActionTypes.PUNCTUATION_TO_CARD_ADD_HANDLE,
  payload: {
    cardPunctuation,
  },
});

export const removePunctuationFromCard = (id, cardId) => ({
  type: EntryActionTypes.PUNCTUATION_FROM_CARD_REMOVE,
  payload: {
    id,
    cardId,
  },
});

export const removePunctuationFromCurrentCard = (id) => ({
  type: EntryActionTypes.PUNCTUATION_FROM_CURRENT_CARD_REMOVE,
  payload: {
    id,
  },
});

export const handlePunctuationFromCardRemove = (cardPunctuation) => ({
  type: EntryActionTypes.PUNCTUATION_FROM_CARD_REMOVE_HANDLE,
  payload: {
    cardPunctuation,
  },
});

export const addPunctuationToFilterInCurrentBoard = (id) => ({
  type: EntryActionTypes.PUNCTUATION_TO_FILTER_IN_CURRENT_BOARD_ADD,
  payload: {
    id,
  },
});

export const removePunctuationFromFilterInCurrentBoard = (id) => ({
  type: EntryActionTypes.PUNCTUATION_FROM_FILTER_IN_CURRENT_BOARD_REMOVE,
  payload: {
    id,
  },
});
