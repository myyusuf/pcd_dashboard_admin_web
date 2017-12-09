import projectLogics from './project';
import projectFormLogics from './project_form';
import projectTypeLogics from './project_type';

export default [
  ...projectLogics,
  ...projectFormLogics,
  ...projectTypeLogics,
];
