import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const ProjectTypeSelect = ({ projectTypes, value, onSelect }) => (
  <Select
    placeholder="Select Project Type"
    style={{ width: 120 }}
    onSelect={onSelect}
    value={value}
  >
    {projectTypes.map(projectType => (
      <Option value={projectType.id}>{projectType.name}</Option>
    ))}
  </Select>
);

ProjectTypeSelect.propTypes = {
  projectTypes: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    projectTypes: state.projectReducers.projectTypes,
  }
);

const ProjectTypeSelectWrapper = connect(
  mapStateToProps,
  null,
)(ProjectTypeSelect);

export default ProjectTypeSelectWrapper;
