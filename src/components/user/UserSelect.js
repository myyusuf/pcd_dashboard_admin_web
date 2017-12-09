import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const UserSelect = ({ users, value, onSelect, style = {} }) => (
  <Select
    placeholder="Select User"
    onSelect={onSelect}
    value={value}
    style={style}
  >
    {users.map(user => (
      <Option value={String(user.id)}>{user.name}</Option>
    ))}
  </Select>
);

UserSelect.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape).isRequired,
  value: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  style: PropTypes.shape,
};

const mapStateToProps = state => (
  {
    users: state.userReducers.allUsersByRole,
  }
);

const UserSelectWrapper = connect(
  mapStateToProps,
  null,
)(UserSelect);

export default UserSelectWrapper;
