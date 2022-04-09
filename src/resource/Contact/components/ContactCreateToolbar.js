import React from "react";
import {
    useNotify,
    useRedirect,
    Toolbar,
    SaveButton,
    usePermissions,
} from "react-admin";

import get from "lodash/get";

import { getResourcePermissions, ADD_PERM } from '../../../misc/permissions';

const ContactCreateToolbar = props => {
    const notify = useNotify();
    const redirect = useRedirect();
    const { permissions } = usePermissions();

    const contactPerms = React.useMemo(
        () => getResourcePermissions(permissions, props.resource)
    , [permissions, props.resource])

    const onSuccessSave = ({ data }) => {
        localStorage.removeItem(props.resource);
        notify(`resources.${props.resource}.messages.sucessCreate`, 'success');
        redirect(get(data, 'link_redirect', 'list'));
    };
    
    return (
        <Toolbar {...props}>
            {contactPerms[ADD_PERM] && (
                <SaveButton
                    {...props}
                    onSuccess={onSuccessSave}
                />
            )}
        </Toolbar>
    );
};

export default ContactCreateToolbar;
