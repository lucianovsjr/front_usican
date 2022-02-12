import React from "react";
import {
    useNotify,
    useRedirect,
    Toolbar,
    SaveButton,
    DeleteButton,
} from "react-admin";

import { makeStyles } from '@material-ui/styles';
import get from "lodash/get";

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

const BaseToolbar = props => {
    const notify = useNotify();
    const redirect = useRedirect();
    const classes = useStyles();

    const onSuccessSave = ({ data }) => {
        localStorage.removeItem(props.resource);
        notify(`resources.${props.resource}.messages.sucessCreate`, { type: 'success' });
        redirect(get(data, 'link_redirect', 'list'));
    };
    
    const onSuccessDelete = ({ data }) => {
        notify(`resources.${props.resource}.messages.sucessDelete`, 'info', { smart_count: 1 });
        redirect(get(data, 'link_redirect', 'list'));
    };
    
    return (
        <Toolbar {...props} className={classes.defaultToolbar}>
            <SaveButton
                {...props}
                onSuccess={onSuccessSave}
            />
            <DeleteButton
                {...props}
                mutationMode="pessimistic"
                onSuccess={onSuccessDelete}
            />
        </Toolbar>
    );
};

export default BaseToolbar;
