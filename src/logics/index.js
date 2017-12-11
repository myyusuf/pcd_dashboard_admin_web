import userLogics from './user/';
import projectLogics from './project/';
import financeLogics from './finance/';

export default [
  ...userLogics,
  ...projectLogics,
  ...financeLogics,
];
