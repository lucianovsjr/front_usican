import React from 'react';
import { Button, useUpdateMany, useRefresh, useNotify, useUnselectAll } from 'react-admin';

import CheckIcon from '@material-ui/icons/Check'

const dataUpdate = { status: 4, informed_customer_decline: false };

const ReopenButton = ({ selectedIds, resource, ...rest }) => {
    const refresh = useRefresh();
    const notify = useNotify();
    const unselectAll = useUnselectAll();
    const [updateMany, { loading }] = useUpdateMany(
        'budget_request',
        selectedIds,
        dataUpdate,
        {
            onSuccess: () => {
                notify('resources.budget_request.messages.reopenSuccess', 'success', { smart_count: selectedIds.length });
                unselectAll(resource);
                refresh();
            },
            onFailure: ({ message }) => {
                notify(message, 'error')
                refresh();
            }
        },
    );

    return (
        <Button
            {...rest}
            label="resources.budget_request.buttons.reopen"
            disabled={loading}
            onClick={updateMany}
        >
            <CheckIcon />
        </Button>
    );
};

export default ReopenButton;
