import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import UserForm from './UserForm';

const UserWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Add User"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
  >
    <UserForm />
  </Modal>
);

UserWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.userReducers.userWindow.visible,
    confirmLoading: state.userReducers.userWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_USER_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_USER_LOGIC',
      });
    },
  }
);

const UserWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserWindow);

export default UserWindowWrapper;
