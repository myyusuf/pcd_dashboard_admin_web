import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';

import RoleSelect from './RoleSelect';

const FormItem = Form.Item;

const UserForm = ({ userForm, userFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Username"
          colon={false}
          validateStatus={userForm.username.validateStatus}
          help={userForm.username.errorMsg}
        >
          <Input
            value={userForm.username.value}
            onChange={(e) => {
              userFormChanged({
                key: 'username',
                value: e.target.value,
              });
            }}
            placeholder="Username"
            maxLength={30}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <FormItem
          label="Name"
          colon={false}
          validateStatus={userForm.name.validateStatus}
          help={userForm.name.errorMsg}
        >
          <Input
            value={userForm.name.value}
            onChange={(e) => {
              userFormChanged({
                key: 'name',
                value: e.target.value,
              });
            }}
            placeholder="Name"
            maxLength={50}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <FormItem
          label="Role"
          colon={false}
          validateStatus={userForm.role.validateStatus}
          help={userForm.role.errorMsg}
        >
          <RoleSelect
            value={userForm.role.value}
            onSelect={(value) => {
              userFormChanged({
                key: 'role',
                value,
              });
            }}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <FormItem
          label="Email"
          colon={false}
          validateStatus={userForm.email.validateStatus}
          help={userForm.email.errorMsg}
        >
          <Input
            value={userForm.email.value}
            onChange={(e) => {
              userFormChanged({
                key: 'email',
                value: e.target.value,
              });
            }}
            placeholder="Email"
            maxLength={70}
          />
        </FormItem>
      </Col>
    </Row>
  </Form>
);

UserForm.propTypes = {
  userFormChanged: PropTypes.func.isRequired,
  userForm: PropTypes.shape({
    username: PropTypes.shape.isRequired,
    name: PropTypes.shape.isRequired,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    userForm: state.userReducers.userForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    userFormChanged: (payload) => {
      dispatch({
        type: 'USER_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const UserFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserForm);

export default UserFormWrapper;
