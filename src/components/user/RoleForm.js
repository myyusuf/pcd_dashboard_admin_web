import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';

const FormItem = Form.Item;

const RoleForm = ({ roleForm, roleFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={roleForm.code.validateStatus}
          help={roleForm.code.errorMsg}
        >
          <Input
            value={roleForm.code.value}
            onChange={(e) => {
              roleFormChanged({
                key: 'code',
                value: e.target.value,
              });
            }}
            placeholder="Code"
            maxLength={20}
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <FormItem
          label="Name"
          colon={false}
          validateStatus={roleForm.name.validateStatus}
          help={roleForm.name.errorMsg}
        >
          <Input
            value={roleForm.name.value}
            onChange={(e) => {
              roleFormChanged({
                key: 'name',
                value: e.target.value,
              });
            }}
            placeholder="Name"
            maxLength={30}
          />
        </FormItem>
      </Col>
    </Row>
  </Form>
);

RoleForm.propTypes = {
  roleFormChanged: PropTypes.func.isRequired,
  roleForm: PropTypes.shape({
    code: PropTypes.shape.isRequired,
    name: PropTypes.shape.isRequired,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    roleForm: state.userReducers.roleForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    roleFormChanged: (payload) => {
      dispatch({
        type: 'ROLE_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const RoleFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoleForm);

export default RoleFormWrapper;
