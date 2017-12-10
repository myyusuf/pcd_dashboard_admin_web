import { combineReducers } from 'redux';
import projects from './projects';
import projectForm from './project_form';
import projectWindow from './project_window';
import projectSearch from './project_search';
import projectTypes from './project_types';
import projectProgresses from './project_progresses';
import projectProgressSearch from './project_progress_search';

const projectReducer = combineReducers({
  projects,
  projectForm,
  projectWindow,
  projectSearch,
  projectTypes,
  projectProgresses,
  projectProgressSearch,
});

export default projectReducer;
