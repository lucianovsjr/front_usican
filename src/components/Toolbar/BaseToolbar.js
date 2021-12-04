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

import BackButton from "./../BackButton";

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
    cancelButton: {
        flex: 0,
        marginLeft: theme.spacing.unit,
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
        console.log(data);
        redirect(get(data, 'link_redirect', 'list'));
    };
    
    const onSuccessDelete = ({ data }) => {
        notify(`resources.${props.resource}.messages.sucessDelete`, 'info', { smart_count: 1 });
        redirect(get(data, 'link_redirect', 'list'));
    };
    
    return (
        <Toolbar {...props} className={classes.defaultToolbar}>
            <div className={classes.primaryButtonsToolbar}>
                <SaveButton
                    {...props}
                    onSuccess={onSuccessSave}
                />
                {get(props, 'record.link_redirect') &&
                    <BackButton
                        {...props}
                        pathRedirect={get(props, 'record.link_redirect')}
                        className={classes.cancelButton}
                    />
                }
            </div>
            <DeleteButton
                {...props}
                mutationMode="pessimistic"
                onSuccess={onSuccessDelete}
            />
        </Toolbar>
    );
};

export default BaseToolbar;
