import React from 'react';

import { BulkDeleteButton } from 'react-admin';

import { CHANGE_PERM, DELETE_PERM } from '../../../misc/permissions';

import CancelButton from './CancelButton'
import ReopenButton from './ReopenButton'

const BudgetRequestBulActionButtons = ({ budgetRequestPerms, ...rest }) => (
    <React.Fragment>
        {budgetRequestPerms[CHANGE_PERM] && <CancelButton {...rest} />}
        {budgetRequestPerms[CHANGE_PERM] && <ReopenButton {...rest} />}
        {budgetRequestPerms[DELETE_PERM] && <BulkDeleteButton {...rest} />}
    </React.Fragment>
);

export default BudgetRequestBulActionButtons;
