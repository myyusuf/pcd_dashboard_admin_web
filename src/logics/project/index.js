import projectLogics from './project';
import projectFormLogics from './project_form';
import projectTypeLogics from './project_type';
import projectProgressLogics from './project_progress';
import piutangLogics from './piutang';

export default [
  ...projectLogics,
  ...projectFormLogics,
  ...projectTypeLogics,
  ...projectProgressLogics,
  ...piutangLogics,
];
