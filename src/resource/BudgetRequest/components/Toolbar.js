import React from 'react';

import { Toolbar, SaveButton, DeleteButton } from 'react-admin';

import makeStyles from '@material-ui/styles/makeStyles'

import get from 'lodash/get';

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const BudgetRequestToolbar = (props) => { 
    const classes = useStyles();

    return (
        <Toolbar {...props} className={classes.toolbar}>
            <SaveButton disabled={get(props, 'record.status') !== 4} />
            <DeleteButton />
        </Toolbar>
    );
}

export default BudgetRequestToolbar;
