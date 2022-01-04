import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  filterLabelsForCurrentBoardSelector,
  filterPunctuationsForCurrentBoardSelector,
  filterUsersForCurrentBoardSelector,
  isCurrentUserManagerForCurrentProjectSelector,
  labelsForCurrentBoardSelector,
  membershipsForCurrentBoardSelector,
  punctuationsForCurrentBoardSelector,
  usersSelector,
} from '../selectors';
import {
  addPunctuationToFilterInCurrentBoard,
  addLabelToFilterInCurrentBoard,
  addUserToFilterInCurrentBoard,
  createPunctuationInCurrentBoard,
  createLabelInCurrentBoard,
  createMembershipInCurrentBoard,
  deleteBoardMembership,
  deletePunctuation,
  deleteLabel,
  removePunctuationFromFilterInCurrentBoard,
  removeLabelFromFilterInCurrentBoard,
  removeUserFromFilterInCurrentBoard,
  updatePunctuation,
  updateLabel,
} from '../actions/entry';
import BoardActions from '../components/BoardActions';

const mapStateToProps = (state) => {
  const allUsers = usersSelector(state);
  const isCurrentUserManager = isCurrentUserManagerForCurrentProjectSelector(state);
  const memberships = membershipsForCurrentBoardSelector(state);
  const labels = labelsForCurrentBoardSelector(state);
  const punctuations = punctuationsForCurrentBoardSelector(state);
  const filterUsers = filterUsersForCurrentBoardSelector(state);
  const filterLabels = filterLabelsForCurrentBoardSelector(state);
  const filterPunctuations = filterPunctuationsForCurrentBoardSelector(state);

  return {
    memberships,
    labels,
    punctuations,
    filterUsers,
    filterPunctuations,
    filterLabels,
    allUsers,
    canEditMemberships: isCurrentUserManager,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onMembershipCreate: createMembershipInCurrentBoard,
      onMembershipDelete: deleteBoardMembership,
      onUserToFilterAdd: addUserToFilterInCurrentBoard,
      onUserFromFilterRemove: removeUserFromFilterInCurrentBoard,
      onPunctuationToFilterAdd: addPunctuationToFilterInCurrentBoard,
      onPunctuationFromFilterRemove: removePunctuationFromFilterInCurrentBoard,
      onPunctuationCreate: createPunctuationInCurrentBoard,
      onPunctuationUpdate: updatePunctuation,
      onPunctuationDelete: deletePunctuation,
      onLabelToFilterAdd: addLabelToFilterInCurrentBoard,
      onLabelFromFilterRemove: removeLabelFromFilterInCurrentBoard,
      onLabelCreate: createLabelInCurrentBoard,
      onLabelUpdate: updateLabel,
      onLabelDelete: deleteLabel,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(BoardActions);
