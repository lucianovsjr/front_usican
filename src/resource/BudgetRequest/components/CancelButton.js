import React from 'react';
import { Button, useUpdateMany, useRefresh, useNotify, useUnselectAll } from 'react-admin';

import ClearIcon from '@material-ui/icons/Clear'

const dataUpdate = { status: 7 };

const CancelButton = ({ selectedIds, resource, ...rest }) => {
    const refresh = useRefresh();
    const notify = useNotify();
    const unselectAll = useUnselectAll();
    const [updateMany, { loading }] = useUpdateMany(
        'budget_request',
        selectedIds,
        dataUpdate,
        {
            onSuccess: () => {
                notify('resources.budget_request.messages.cancelSuccess', 'success', { smart_count: selectedIds.length });
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
            label="resources.budget_request.buttons.cancel"
            disabled={loading}
            onClick={updateMany}
        >
            <ClearIcon />
        </Button>
    );
};

export default CancelButton;
