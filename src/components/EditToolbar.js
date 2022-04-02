import React from "react";
import {
    Toolbar,
    SaveButton,
    DeleteButton,
    usePermissions,
} from "react-admin";

import { makeStyles } from '@material-ui/styles';

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

const getPromisse = (permissions, resource, action) =>
    permissions.findIndex(perm => perm.codename === `${action}_${resource.replaceAll('_', '')}`) >= 0;

const EditToolbar = props => {
    const classes = useStyles();
    const { loading, permissions } = usePermissions();
    
    const viewPerm = React.useMemo(() => loading
        ? false
        : getPromisse(permissions, props.resource, 'delete')
    , [loading, permissions, props.resource]);
    const changePerm = React.useMemo(() => loading
        ? false
        : getPromisse(permissions, props.resource, 'change')
    , [loading, permissions, props.resource]);
    
    return (
        <Toolbar {...props} className={classes.defaultToolbar}>
            <SaveButton
                handleSubmitWithRedirect={
                    props.handleSubmitWithRedirect || props.handleSubmit
                }
                disabled={!changePerm || props.disabled}
                invalid={props.invalid}
                redirect={props.redirect}
                saving={props.saving || props.validating}
                submitOnEnter={props.submitOnEnter}
            />
            {props.record && typeof props.record.id !== 'undefined' && (
                    <DeleteButton
                        basePath={props.basePath}
                        record={props.record}
                        resource={props.resource}
                        undoable={props.undoable}
                        mutationMode={props.mutationMode}
                        disabled={!viewPerm}
                    />
                )}
        </Toolbar>
    );
};

export default EditToolbar;
