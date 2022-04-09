import React from 'react';

import { BulkDeleteButton, usePermissions } from 'react-admin';

import { getResourcePermissions, DELETE_PERM } from '../misc/permissions';


const DefaultBulkActionButtons = props => {
    const { permissions } = usePermissions();

    const resourcePerms = React.useMemo(
        () => getResourcePermissions(permissions, props.resource),
    [permissions, props.resource]);
    
    return (
        <React.Fragment>
            {resourcePerms[DELETE_PERM] && <BulkDeleteButton {...props} undoable={false} />}
        </React.Fragment>
    )
};

export default DefaultBulkActionButtons;
