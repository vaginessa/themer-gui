import React from 'react';
import classnames from 'classnames';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import { closeDialogs } from '../actions';
import ExportDialog from './ExportDialog';
import HelpDialog from './HelpDialog';
import ExportProgressDialog from './ExportProgressDialog';
import { IN_PROGRESS } from '../helpers/exportProgressStates';
import css from './Dialogs.css';

const overlayId = 'overlay';

const Dialogs = ({
  currentDialog,
  shouldCloseOnOverlayClick,
  closeDialogs,
}) => (
  <CSSTransitionGroup
    transitionName={{
      appear: css.dialogAppear,
      appearActive: css.dialogAppearActive,
      enter: css.dialogEnter,
      enterActive: css.dialogEnterActive,
      leave: css.dialogLeave,
      leaveActive: css.dialogLeaveActive,
    }}
    transitionAppear
    transitionAppearTimeout={ 400 }
    transitionEnterTimeout={ 400 }
    transitionLeaveTimeout={ 200 }
  >
    { currentDialog ? (
      <div
        id={ overlayId }
        key="overlay"
        className={ css.overlay }
        onClick={ (evt) => { if (shouldCloseOnOverlayClick && evt.target.id === overlayId) { closeDialogs(); }} }
      >
        { currentDialog === 'help' ? (
          <HelpDialog key="help-dialog" />
        ) : null }
        { currentDialog === 'export' ? (
          <ExportDialog key="export-dialog" />
        ) : null }
        { currentDialog === 'exportProgress' ? (
          <ExportProgressDialog key="export-progress-dialog" />
        ) : null }
      </div>
    ) : null }
  </CSSTransitionGroup>
);

const mapStateToProps = state => ({
  currentDialog: Object.keys(state.dialogsVisibility).find(key => state.dialogsVisibility[key]),
  shouldCloseOnOverlayClick: state.exportProgress.state !== IN_PROGRESS,
});
const mapDispatchToProps = { closeDialogs };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dialogs);