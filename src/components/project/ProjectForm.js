import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';

import ProjectTypeSelect from './ProjectTypeSelect';

const FormItem = Form.Item;

const ProjectForm = ({ projectForm, projectFormChanged }) => (
  <Form>
    <Row>
      <Col span={24}>
        <FormItem
          label="Code"
          colon={false}
          validateStatus={projectForm.code.validateStatus}
          help={projectForm.code.errorMsg}
        >
          <Input
            value={projectForm.code.value}
            onChange={(e) => {
              projectFormChanged({
                key: 'code',
                value: e.target.value,
              });
            }}
            placeholder="Code"
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
          validateStatus={projectForm.name.validateStatus}
          help={projectForm.name.errorMsg}
        >
          <Input
            value={projectForm.name.value}
            onChange={(e) => {
              projectFormChanged({
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
          label="Project Type"
          colon={false}
          validateStatus={projectForm.projectType.validateStatus}
          help={projectForm.projectType.errorMsg}
        >
          <ProjectTypeSelect
            value={projectForm.projectType.value}
            onSelect={(value) => {
              projectFormChanged({
                key: 'projectType',
                value,
              });
            }}
          />
        </FormItem>
      </Col>
    </Row>
  </Form>
);

ProjectForm.propTypes = {
  projectFormChanged: PropTypes.func.isRequired,
  projectForm: PropTypes.shape({
    code: PropTypes.shape.isRequired,
    name: PropTypes.shape.isRequired,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    projectForm: state.projectReducers.projectForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    projectFormChanged: (payload) => {
      dispatch({
        type: 'PROJECT_FORM_CHANGED_LOGIC',
        payload,
      });
    },
  }
);

const ProjectFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectForm);

export default ProjectFormWrapper;
