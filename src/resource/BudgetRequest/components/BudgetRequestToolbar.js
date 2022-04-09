import React from 'react';

import { Toolbar, SaveButton, DeleteButton, usePermissions } from 'react-admin';

import makeStyles from '@material-ui/styles/makeStyles'

import get from 'lodash/get';

import { getResourcePermissions, CHANGE_PERM, DELETE_PERM } from '../../../misc/permissions';

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const BudgetRequestToolbar = (props) => {
    const classes = useStyles();
    const { permissions } = usePermissions();

    const budgetRequestPerms = React.useMemo(
        () => getResourcePermissions(permissions, props.resource),
    [permissions, props.resource]);

    return (
        <Toolbar {...props} className={classes.toolbar}>
            {budgetRequestPerms[CHANGE_PERM] ? (
                <SaveButton disabled={get(props, 'record.status') !== 4} />
            ) : <div />}
            {budgetRequestPerms[DELETE_PERM] && <DeleteButton />}
        </Toolbar>
    );
}

export default BudgetRequestToolbar;
