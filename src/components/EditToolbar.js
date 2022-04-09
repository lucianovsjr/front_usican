import React from "react";
import {
    Toolbar,
    SaveButton,
    DeleteButton,
    usePermissions,
} from "react-admin";

import { makeStyles } from '@material-ui/styles';

import { getResourcePermissions, CHANGE_PERM, DELETE_PERM } from "../misc/permissions";

const styles = theme => ({
    defaultToolbar: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    primaryButtonsToolbar: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

const useStyles = makeStyles(theme => styles(theme));

const EditToolbar = props => {
    const classes = useStyles();
    const { permissions } = usePermissions();
    
    const resourcePerms = React.useMemo(
        () => getResourcePermissions(permissions, props.resource)
    , [permissions, props.resource])
    
    return (
        <Toolbar {...props} className={classes.defaultToolbar}>
            {resourcePerms[CHANGE_PERM] ? (
                <SaveButton
                    handleSubmitWithRedirect={
                        props.handleSubmitWithRedirect || props.handleSubmit
                    }
                    disabled={props.disabled}
                    invalid={props.invalid}
                    redirect={props.redirect}
                    saving={props.saving || props.validating}
                    submitOnEnter={props.submitOnEnter}
                />
            ) : <div />}
            {props.record 
                && typeof props.record.id !== 'undefined'
                && resourcePerms[DELETE_PERM]
                && (
                    <DeleteButton
                        basePath={props.basePath}
                        record={props.record}
                        resource={props.resource}
                        undoable={props.undoable}
                        mutationMode={props.mutationMode}
                    />
                )}
        </Toolbar>
    );
};

export default EditToolbar;
