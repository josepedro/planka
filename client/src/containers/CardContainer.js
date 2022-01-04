import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  isCurrentUserMemberForCurrentBoardSelector,
  labelsForCurrentBoardSelector,
  punctuationsForCurrentBoardSelector,
  makeCardByIdSelector,
  makePunctuationsByCardIdSelector,
  makeLabelsByCardIdSelector,
  makeNotificationsTotalByCardIdSelector,
  makeTasksByCardIdSelector,
  makeUsersByCardIdSelector,
  membershipsForCurrentBoardSelector,
  pathSelector,
  projectsToListsForCurrentUserSelector,
} from '../selectors';
import {
  addPunctuationToCard,
  addLabelToCard,
  addUserToCard,
  createPunctuationInCurrentBoard,
  createLabelInCurrentBoard,
  deleteCard,
  deletePunctuation,
  deleteLabel,
  fetchBoard,
  moveCard,
  removePunctuationFromCard,
  removeLabelFromCard,
  removeUserFromCard,
  transferCard,
  updatePunctuation,
  updateLabel,
  updateCard,
} from '../actions/entry';
import Card from '../components/Card';

const makeMapStateToProps = () => {
  const cardByIdSelector = makeCardByIdSelector();
  const usersByCardIdSelector = makeUsersByCardIdSelector();
  const punctuationsByCardIdSelector = makePunctuationsByCardIdSelector();
  const labelsByCardIdSelector = makeLabelsByCardIdSelector();
  const tasksByCardIdSelector = makeTasksByCardIdSelector();
  const notificationsTotalByCardIdSelector = makeNotificationsTotalByCardIdSelector();

  return (state, { id, index }) => {
    const { projectId } = pathSelector(state);
    const allProjectsToLists = projectsToListsForCurrentUserSelector(state);
    const allBoardMemberships = membershipsForCurrentBoardSelector(state);
    const allPunctuations = punctuationsForCurrentBoardSelector(state);
    const allLabels = labelsForCurrentBoardSelector(state);
    const isCurrentUserMember = isCurrentUserMemberForCurrentBoardSelector(state);

    const { name, dueDate, timer, coverUrl, boardId, listId, isPersisted } = cardByIdSelector(
      state,
      id,
    );

    const users = usersByCardIdSelector(state, id);
    const punctuations = punctuationsByCardIdSelector(state, id);
    const labels = labelsByCardIdSelector(state, id);
    const tasks = tasksByCardIdSelector(state, id);
    const notificationsTotal = notificationsTotalByCardIdSelector(state, id);

    return {
      id,
      index,
      name,
      dueDate,
      timer,
      coverUrl,
      boardId,
      listId,
      projectId,
      isPersisted,
      notificationsTotal,
      users,
      punctuations,
      labels,
      tasks,
      allProjectsToLists,
      allBoardMemberships,
      allPunctuations,
      allLabels,
      canEdit: isCurrentUserMember,
    };
  };
};

const mapDispatchToProps = (dispatch, { id }) =>
  bindActionCreators(
    {
      onUpdate: (data) => updateCard(id, data),
      onMove: (listId, index) => moveCard(id, listId, index),
      onTransfer: (boardId, listId) => transferCard(id, boardId, listId),
      onDelete: () => deleteCard(id),
      onUserAdd: (userId) => addUserToCard(userId, id),
      onUserRemove: (userId) => removeUserFromCard(userId, id),
      onBoardFetch: fetchBoard,
      onPunctuationAdd: (punctuationId) => addPunctuationToCard(punctuationId, id),
      onPunctuationRemove: (punctuationId) => removePunctuationFromCard(punctuationId, id),
      onPunctuationCreate: (data) => createPunctuationInCurrentBoard(data),
      onPunctuationUpdate: (punctuationId, data) => updatePunctuation(punctuationId, data),
      onPunctuationDelete: (punctuationId) => deletePunctuation(punctuationId),
      onLabelAdd: (labelId) => addLabelToCard(labelId, id),
      onLabelRemove: (labelId) => removeLabelFromCard(labelId, id),
      onLabelCreate: (data) => createLabelInCurrentBoard(data),
      onLabelUpdate: (labelId, data) => updateLabel(labelId, data),
      onLabelDelete: (labelId) => deleteLabel(labelId),
    },
    dispatch,
  );

export default connect(makeMapStateToProps, mapDispatchToProps)(Card);
