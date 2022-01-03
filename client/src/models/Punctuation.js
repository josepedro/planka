import { Model, attr, fk } from 'redux-orm';

import ActionTypes from '../constants/ActionTypes';

export default class extends Model {
  static modelName = 'Punctuation';

  static fields = {
    id: attr(),
    name: attr(),
    color: attr(),
    boardId: fk({
      to: 'Board',
      as: 'board',
      relatedName: 'punctuations',
    }),
  };

  static reducer({ type, payload }, Punctuation) {
    switch (type) {
      case ActionTypes.LOCATION_CHANGE_HANDLE:
      case ActionTypes.CORE_INITIALIZE:
      case ActionTypes.PROJECT_MANAGER_CREATE_HANDLE:
      case ActionTypes.BOARD_MEMBERSHIP_CREATE_HANDLE:
        if (payload.punctuations) {
          payload.punctuations.forEach((punctuation) => {
            Punctuation.upsert(punctuation);
          });
        }

        break;
      case ActionTypes.SOCKET_RECONNECT_HANDLE:
        Punctuation.all().delete();

        if (payload.punctuations) {
          payload.punctuations.forEach((punctuation) => {
            Punctuation.upsert(punctuation);
          });
        }

        break;
      case ActionTypes.BOARD_FETCH__SUCCESS:
        payload.punctuations.forEach((punctuation) => {
          Punctuation.upsert(punctuation);
        });

        break;
      case ActionTypes.PUNCTUATION_CREATE:
      case ActionTypes.PUNCTUATION_CREATE_HANDLE:
      case ActionTypes.PUNCTUATION_UPDATE__SUCCESS:
      case ActionTypes.PUNCTUATION_UPDATE_HANDLE:
        Punctuation.upsert(payload.punctuation);

        break;
      case ActionTypes.PUNCTUATION_CREATE__SUCCESS:
        Punctuation.withId(payload.localId).delete();
        Punctuation.upsert(payload.punctuation);

        break;
      case ActionTypes.PUNCTUATION_UPDATE:
        Punctuation.withId(payload.id).update(payload.data);

        break;
      case ActionTypes.PUNCTUATION_DELETE:
        Punctuation.withId(payload.id).delete();

        break;
      case ActionTypes.PUNCTUATION_DELETE__SUCCESS:
      case ActionTypes.PUNCTUATION_DELETE_HANDLE: {
        const punctuationModel = Punctuation.withId(payload.punctuation.id);

        if (punctuationModel) {
          punctuationModel.delete();
        }

        break;
      }
      default:
    }
  }
}
