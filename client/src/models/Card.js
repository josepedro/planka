import { Model, attr, fk, many, oneToOne } from 'redux-orm';

import ActionTypes from '../constants/ActionTypes';
import Config from '../constants/Config';

export default class extends Model {
  static modelName = 'Card';

  static fields = {
    id: attr(),
    position: attr(),
    name: attr(),
    description: attr(),
    dueDate: attr(),
    timer: attr(),
    isSubscribed: attr({
      getDefault: () => false,
    }),
    isActionsFetching: attr({
      getDefault: () => false,
    }),
    isAllActionsFetched: attr({
      getDefault: () => false,
    }),
    boardId: fk({
      to: 'Board',
      as: 'board',
      relatedName: 'cards',
    }),
    listId: fk({
      to: 'List',
      as: 'list',
      relatedName: 'cards',
    }),
    coverAttachmentId: oneToOne({
      to: 'Attachment',
      as: 'coverAttachment',
      relatedName: 'coveredCard',
    }),
    users: many('User', 'cards'),
    labels: many('Label', 'cards'),
    punctuations: many('Punctuation', 'cards'),
  };

  static reducer({ type, payload }, Card) {
    switch (type) {
      case ActionTypes.LOCATION_CHANGE_HANDLE:
      case ActionTypes.CORE_INITIALIZE:
      case ActionTypes.PROJECT_MANAGER_CREATE_HANDLE:
      case ActionTypes.BOARD_MEMBERSHIP_CREATE_HANDLE:
        if (payload.cards) {
          payload.cards.forEach((card) => {
            Card.upsert(card);
          });
        }

        if (payload.cardMemberships) {
          payload.cardMemberships.forEach(({ cardId, userId }) => {
            Card.withId(cardId).users.add(userId);
          });
        }

        if (payload.cardLabels) {
          payload.cardLabels.forEach(({ cardId, labelId }) => {
            Card.withId(cardId).labels.add(labelId);
          });
        }

        if (payload.cardPunctuations) {
          payload.cardPunctuations.forEach(({ cardId, punctuationId }) => {
            Card.withId(cardId).punctuations.add(punctuationId);
          });
        }

        break;
      case ActionTypes.SOCKET_RECONNECT_HANDLE:
        Card.all().delete();

        if (payload.cards) {
          payload.cards.forEach((card) => {
            Card.upsert(card);
          });
        }

        if (payload.cardMemberships) {
          payload.cardMemberships.forEach(({ cardId, userId }) => {
            Card.withId(cardId).users.add(userId);
          });
        }

        if (payload.cardLabels) {
          payload.cardLabels.forEach(({ cardId, labelId }) => {
            Card.withId(cardId).labels.add(labelId);
          });
        }

        if (payload.cardPunctuations) {
          payload.cardPunctuations.forEach(({ cardId, punctuationId }) => {
            Card.withId(cardId).punctuations.add(punctuationId);
          });
        }

        break;
      case ActionTypes.USER_TO_CARD_ADD: {
        const cardModel = Card.withId(payload.cardId);
        cardModel.users.add(payload.id);

        if (payload.isCurrent) {
          cardModel.isSubscribed = true;
        }

        break;
      }
      case ActionTypes.USER_TO_CARD_ADD__SUCCESS:
      case ActionTypes.USER_TO_CARD_ADD_HANDLE:
        try {
          Card.withId(payload.cardMembership.cardId).users.add(payload.cardMembership.userId);
        } catch {} // eslint-disable-line no-empty

        break;
      case ActionTypes.USER_FROM_CARD_REMOVE:
        Card.withId(payload.cardId).users.remove(payload.id);

        break;
      case ActionTypes.USER_FROM_CARD_REMOVE__SUCCESS:
      case ActionTypes.USER_FROM_CARD_REMOVE_HANDLE:
        try {
          Card.withId(payload.cardMembership.cardId).users.remove(payload.cardMembership.userId);
        } catch {} // eslint-disable-line no-empty

        break;
      case ActionTypes.BOARD_FETCH__SUCCESS:
        payload.cards.forEach((card) => {
          Card.upsert(card);
        });

        payload.cardMemberships.forEach(({ cardId, userId }) => {
          Card.withId(cardId).users.add(userId);
        });

        payload.cardLabels.forEach(({ cardId, labelId }) => {
          Card.withId(cardId).labels.add(labelId);
        });

        payload.cardPunctuations.forEach(({ cardId, punctuationId }) => {
          Card.withId(cardId).punctuations.add(punctuationId);
        });

        break;
      case ActionTypes.LABEL_TO_CARD_ADD:
        Card.withId(payload.cardId).labels.add(payload.id);

        break;
      case ActionTypes.PUNCTUATION_TO_CARD_ADD:
        Card.withId(payload.cardId).punctuations.add(payload.id);

        break;
      case ActionTypes.LABEL_TO_CARD_ADD__SUCCESS:
      case ActionTypes.LABEL_TO_CARD_ADD_HANDLE:
        try {
          Card.withId(payload.cardLabel.cardId).labels.add(payload.cardLabel.labelId);
        } catch {} // eslint-disable-line no-empty

        break;
      case ActionTypes.PUNCTUATION_TO_CARD_ADD__SUCCESS:
      case ActionTypes.PUNCTUATION_TO_CARD_ADD_HANDLE:
        try {
          // eslint-disable-next-line prettier/prettier
          Card.withId(payload.cardPunctuation.cardId).punctuations.add(payload.cardPunctuation.punctuationId);
        } catch {} // eslint-disable-line no-empty

        break;
      case ActionTypes.LABEL_FROM_CARD_REMOVE:
        Card.withId(payload.cardId).labels.remove(payload.id);

        break;
      case ActionTypes.PUNCTUATION_FROM_CARD_REMOVE:
        Card.withId(payload.cardId).punctuations.remove(payload.id);

        break;
      case ActionTypes.LABEL_FROM_CARD_REMOVE__SUCCESS:
      case ActionTypes.LABEL_FROM_CARD_REMOVE_HANDLE:
        try {
          Card.withId(payload.cardLabel.cardId).labels.remove(payload.cardLabel.labelId);
        } catch {} // eslint-disable-line no-empty

        break;
      case ActionTypes.PUNCTUATION_FROM_CARD_REMOVE__SUCCESS:
      case ActionTypes.PUNCTUATION_FROM_CARD_REMOVE_HANDLE:
        try {
          // eslint-disable-next-line prettier/prettier
          Card.withId(payload.cardPunctuation.cardId).punctuations.remove(payload.cardPunctuation.punctuationId);
          // eslint-disable-next-line no-empty
        } catch {}

        break;
      case ActionTypes.CARD_CREATE:
      case ActionTypes.CARD_CREATE_HANDLE:
      case ActionTypes.CARD_UPDATE__SUCCESS:
      case ActionTypes.CARD_UPDATE_HANDLE:
        Card.upsert(payload.card);

        break;
      case ActionTypes.CARD_CREATE__SUCCESS:
        Card.withId(payload.localId).delete();
        Card.upsert(payload.card);

        break;
      case ActionTypes.CARD_UPDATE:
        Card.withId(payload.id).update(payload.data);

        break;
      case ActionTypes.CARD_DELETE:
        Card.withId(payload.id).delete();

        break;
      case ActionTypes.CARD_DELETE__SUCCESS:
      case ActionTypes.CARD_DELETE_HANDLE: {
        const cardModel = Card.withId(payload.card.id);

        if (cardModel) {
          cardModel.deleteWithRelated();
        }

        break;
      }
      case ActionTypes.ACTIONS_FETCH:
        Card.withId(payload.cardId).update({
          isActionsFetching: true,
        });

        break;
      case ActionTypes.ACTIONS_FETCH__SUCCESS:
        Card.withId(payload.cardId).update({
          isActionsFetching: false,
          isAllActionsFetched: payload.actions.length < Config.ACTIONS_LIMIT,
        });

        break;
      case ActionTypes.NOTIFICATION_CREATE_HANDLE:
        payload.cards.forEach((card) => {
          Card.upsert(card);
        });

        break;
      default:
    }
  }

  getOrderedTasksQuerySet() {
    return this.tasks.orderBy('id');
  }

  getOrderedAttachmentsQuerySet() {
    return this.attachments.orderBy('id', false);
  }

  getOrderedInCardActionsQuerySet() {
    return this.actions.orderBy('id', false);
  }

  getUnreadNotificationsQuerySet() {
    return this.notifications.filter({
      isRead: false,
    });
  }

  deleteRelated() {
    this.tasks.delete();
    this.attachments.delete();
    this.actions.delete();
  }

  deleteWithRelated() {
    this.deleteRelated();
    this.delete();
  }
}
