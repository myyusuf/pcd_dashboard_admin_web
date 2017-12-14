import projectionLogics from './projection';
import cashFlowLogics from './cash_flow';
import badLogics from './bad';

export default [
  ...projectionLogics,
  ...cashFlowLogics,
  ...badLogics,
];
