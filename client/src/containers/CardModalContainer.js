import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import omit from 'lodash/omit';

import {
  actionsForCurrentCardSelector,
  attachmentsForCurrentCardSelector,
  currentCardSelector,
  isCurrentUserManagerForCurrentProjectSelector,
  isCurrentUserMemberForCurrentBoardSelector,
  punctuationsForCurrentBoardSelector,
  punctuationsForCurrentCardSelector,
  labelsForCurrentBoardSelector,
  labelsForCurrentCardSelector,
  membershipsForCurrentBoardSelector,
  pathSelector,
  projectsToListsForCurrentUserSelector,
  tasksForCurrentCardSelector,
  usersForCurrentCardSelector,
} from '../selectors';
import {
  addPunctuationToCurrentCard,
  addLabelToCurrentCard,
  addUserToCurrentCard,
  createAttachmentInCurrentCard,
  createCommentActionInCurrentCard,
  createPunctuationInCurrentBoard,
  createLabelInCurrentBoard,
  createTaskInCurrentCard,
  deleteAttachment,
  deleteCommentAction,
  deleteCurrentCard,
  deletePunctuation,
  deleteLabel,
  deleteTask,
  fetchActionsInCurrentCard,
  fetchBoard,
  moveCurrentCard,
  removePunctuationFromCurrentCard,
  removeLabelFromCurrentCard,
  removeUserFromCurrentCard,
  transferCurrentCard,
  updateAttachment,
  updateCommentAction,
  updateCurrentCard,
  updatePunctuation,
  updateLabel,
  updateTask,
} from '../actions/entry';
import Paths from '../constants/Paths';
import CardModal from '../components/CardModal';

const mapStateToProps = (state) => {
  const { projectId } = pathSelector(state);
  const allProjectsToLists = projectsToListsForCurrentUserSelector(state);
  const isCurrentUserManager = isCurrentUserManagerForCurrentProjectSelector(state);
  const allBoardMemberships = membershipsForCurrentBoardSelector(state);
  const allPunctuations = punctuationsForCurrentBoardSelector(state);
  const allLabels = labelsForCurrentBoardSelector(state);
  const isCurrentUserMember = isCurrentUserMemberForCurrentBoardSelector(state);

  const {
    name,
    description,
    dueDate,
    timer,
    isSubscribed,
    isActionsFetching,
    isAllActionsFetched,
    boardId,
    listId,
  } = currentCardSelector(state);

  const users = usersForCurrentCardSelector(state);
  const labels = labelsForCurrentCardSelector(state);
  const punctuations = punctuationsForCurrentCardSelector(state);
  const tasks = tasksForCurrentCardSelector(state);
  const attachments = attachmentsForCurrentCardSelector(state);
  const actions = actionsForCurrentCardSelector(state);

  return {
    name,
    description,
    dueDate,
    timer,
    isSubscribed,
    isActionsFetching,
    isAllActionsFetched,
    listId,
    boardId,
    projectId,
    users,
    labels,
    punctuations,
    tasks,
    attachments,
    actions,
    allProjectsToLists,
    allBoardMemberships,
    allPunctuations,
    allLabels,
    canEdit: isCurrentUserMember,
    canEditAllCommentActions: isCurrentUserManager,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onUpdate: updateCurrentCard,
      onMove: moveCurrentCard,
      onTransfer: transferCurrentCard,
      onDelete: deleteCurrentCard,
      onUserAdd: addUserToCurrentCard,
      onUserRemove: removeUserFromCurrentCard,
      onBoardFetch: fetchBoard,
      onPunctuationAdd: addPunctuationToCurrentCard,
      onPunctuationRemove: removePunctuationFromCurrentCard,
      onPunctuationCreate: createPunctuationInCurrentBoard,
      onPunctuationUpdate: updatePunctuation,
      onPunctuationDelete: deletePunctuation,
      onLabelAdd: addLabelToCurrentCard,
      onLabelRemove: removeLabelFromCurrentCard,
      onLabelCreate: createLabelInCurrentBoard,
      onLabelUpdate: updateLabel,
      onLabelDelete: deleteLabel,
      onTaskCreate: createTaskInCurrentCard,
      onTaskUpdate: updateTask,
      onTaskDelete: deleteTask,
      onAttachmentCreate: createAttachmentInCurrentCard,
      onAttachmentUpdate: updateAttachment,
      onAttachmentDelete: deleteAttachment,
      onActionsFetch: fetchActionsInCurrentCard,
      onCommentActionCreate: createCommentActionInCurrentCard,
      onCommentActionUpdate: updateCommentAction,
      onCommentActionDelete: deleteCommentAction,
      push,
    },
    dispatch,
  );

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...omit(dispatchProps, 'push'),
  onClose: () => dispatchProps.push(Paths.BOARDS.replace(':id', stateProps.boardId)),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CardModal);
