import React from "react";
import {
    useNotify,
    useRedirect,
    Toolbar,
    SaveButton,
    DeleteButton,
    usePermissions,
} from "react-admin";

import { makeStyles } from '@material-ui/styles';
import get from "lodash/get";

import { getResourcePermissions, DELETE_PERM, CHANGE_PERM } from '../../../misc/permissions';

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

const ContactEditToolbar = props => {
    const notify = useNotify();
    const redirect = useRedirect();
    const classes = useStyles();
    const { permissions } = usePermissions();

    const contactPerms = React.useMemo(
        () => getResourcePermissions(permissions, props.resource)
    , [permissions, props.resource])

    const onSuccessSave = ({ data }) => {
        localStorage.removeItem(props.resource);
        notify(`resources.${props.resource}.messages.sucessCreate`, 'success');
        redirect(get(data, 'link_redirect', 'list'));
    };
    
    const onSuccessDelete = ({ data }) => {
        notify(`resources.${props.resource}.messages.sucessDelete`, 'info', { smart_count: 1 });
        redirect(get(data, 'link_redirect', 'list'));
    };
    
    return (
        <Toolbar {...props} className={classes.defaultToolbar}>
            {contactPerms[CHANGE_PERM] ? (
                <SaveButton
                    {...props}
                    onSuccess={onSuccessSave}
                />
            ) : <div />}
            {contactPerms[DELETE_PERM] && (
                <DeleteButton
                    {...props}
                    mutationMode="pessimistic"
                    onSuccess={onSuccessDelete}
                />
            )}
        </Toolbar>
    );
};

export default ContactEditToolbar;
