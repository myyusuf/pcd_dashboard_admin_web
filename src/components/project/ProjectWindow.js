import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import ProjectForm from './ProjectForm';

const ProjectWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Add Project"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
  >
    <ProjectForm />
  </Modal>
);

ProjectWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.projectReducers.projectWindow.visible,
    confirmLoading: state.projectReducers.projectWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_PROJECT_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_PROJECT_LOGIC',
      });
    },
  }
);

const ProjectWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectWindow);

export default ProjectWindowWrapper;
