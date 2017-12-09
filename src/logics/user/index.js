import userLogics from './user';
import userFormLogics from './user_form';

import roleLogics from './role';
import roleFormLogics from './role_form';

export default [
  ...userLogics,
  ...userFormLogics,
  ...roleLogics,
  ...roleFormLogics,
];
