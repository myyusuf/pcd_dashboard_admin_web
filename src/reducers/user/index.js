import { combineReducers } from 'redux';
import users from './users';
import userForm from './user_form';
import userWindow from './user_window';
import userSearch from './user_search';

import roles from './roles';
import roleForm from './role_form';
import roleWindow from './role_window';
import roleSearch from './role_search';

import allUsersByRole from './all_users';

const userReducer = combineReducers({
  users,
  userForm,
  userWindow,
  userSearch,
  roles,
  roleForm,
  roleWindow,
  roleSearch,
  allUsersByRole,
});

export default userReducer;
