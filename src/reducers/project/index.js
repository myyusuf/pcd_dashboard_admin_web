import { combineReducers } from 'redux';
import projects from './projects';
import projectForm from './project_form';
import projectWindow from './project_window';
import projectSearch from './project_search';
import projectTypes from './project_types';

const projectReducer = combineReducers({
  projects,
  projectForm,
  projectWindow,
  projectSearch,
  projectTypes,
});

export default projectReducer;
