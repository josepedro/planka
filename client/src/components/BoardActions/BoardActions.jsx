import React from 'react';
import PropTypes from 'prop-types';

import Filters from './Filters';
import Memberships from '../Memberships';

import styles from './BoardActions.module.scss';

const BoardActions = React.memo(
  ({
    memberships,
    punctuations,
    labels,
    filterUsers,
    filterPunctuations,
    filterLabels,
    allUsers,
    canEditMemberships,
    onMembershipCreate,
    onMembershipDelete,
    onUserToFilterAdd,
    onUserFromFilterRemove,
    onPunctuationToFilterAdd,
    onPunctuationFromFilterRemove,
    onPunctuationCreate,
    onPunctuationUpdate,
    onPunctuationDelete,
    onLabelToFilterAdd,
    onLabelFromFilterRemove,
    onLabelCreate,
    onLabelUpdate,
    onLabelDelete,
  }) => {
    return (
      <div className={styles.actions}>
        <div className={styles.action}>
          <Memberships
            items={memberships}
            allUsers={allUsers}
            canEdit={canEditMemberships}
            onCreate={onMembershipCreate}
            onDelete={onMembershipDelete}
          />
        </div>
        <div className={styles.action}>
          <Filters
            users={filterUsers}
            punctuations={filterPunctuations}
            labels={filterLabels}
            allBoardMemberships={memberships}
            allPunctuations={punctuations}
            allLabels={labels}
            onUserAdd={onUserToFilterAdd}
            onUserRemove={onUserFromFilterRemove}
            onPunctuationAdd={onPunctuationToFilterAdd}
            onPunctuationRemove={onPunctuationFromFilterRemove}
            onPunctuationCreate={onPunctuationCreate}
            onPunctuationUpdate={onPunctuationUpdate}
            onPunctuationDelete={onPunctuationDelete}
            onLabelAdd={onLabelToFilterAdd}
            onLabelRemove={onLabelFromFilterRemove}
            onLabelCreate={onLabelCreate}
            onLabelUpdate={onLabelUpdate}
            onLabelDelete={onLabelDelete}
          />
        </div>
      </div>
    );
  },
);

BoardActions.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  memberships: PropTypes.array.isRequired,
  punctuations: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  filterUsers: PropTypes.array.isRequired,
  filterPunctuations: PropTypes.array.isRequired,
  filterLabels: PropTypes.array.isRequired,
  allUsers: PropTypes.array.isRequired,
  /* eslint-enable react/forbid-prop-types */
  canEditMemberships: PropTypes.bool.isRequired,
  onMembershipCreate: PropTypes.func.isRequired,
  onMembershipDelete: PropTypes.func.isRequired,
  onUserToFilterAdd: PropTypes.func.isRequired,
  onUserFromFilterRemove: PropTypes.func.isRequired,
  onPunctuationToFilterAdd: PropTypes.func.isRequired,
  onPunctuationFromFilterRemove: PropTypes.func.isRequired,
  onPunctuationCreate: PropTypes.func.isRequired,
  onPunctuationUpdate: PropTypes.func.isRequired,
  onPunctuationDelete: PropTypes.func.isRequired,
  onLabelToFilterAdd: PropTypes.func.isRequired,
  onLabelFromFilterRemove: PropTypes.func.isRequired,
  onLabelCreate: PropTypes.func.isRequired,
  onLabelUpdate: PropTypes.func.isRequired,
  onLabelDelete: PropTypes.func.isRequired,
};

export default BoardActions;
