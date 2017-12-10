import projectLogics from './project';
import projectFormLogics from './project_form';
import projectTypeLogics from './project_type';
import projectProgressLogics from './project_progress';

export default [
  ...projectLogics,
  ...projectFormLogics,
  ...projectTypeLogics,
  ...projectProgressLogics,
];
